import { Component, OnInit } from '@angular/core';
import { MapagpsService } from '../service/mapagps.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController, Platform, ToastController } from '@ionic/angular';
import {  GoogleMap} from '@ionic-native/google-maps';
import { ReturnStatement } from '@angular/compiler';
export interface Ubicacion{
  latitud?:number;
  longitud?:number;
};
declare var google;
@Component({
  selector: 'app-actualizacion',
  templateUrl: './actualizacion.page.html',
  styleUrls: ['./actualizacion.page.scss'],
})
export class ActualizacionPage implements OnInit {

  map: GoogleMap;
  _ubicacion:Ubicacion={};
  interes={};
  addruta:any;
  listaIdRutas: any[] =[];
  polys:any[]=[];
  toast:any;
  btnact='true';
  addBtn='true';
  conta=0;
  colores=['#FF00FF',' #00FF7F','#1E90FF','#32CD32','#FF00FF']; 
  con=5;
  constructor(
               private loadingController:LoadingController,
               public loadingCtrl:LoadingController,
               private alertController: AlertController,
               public router:Router,
               public puntoRuta:MapagpsService,
               private toastCtrl:ToastController
               ) { }

  ngOnInit() {
    this.loadMap2();
  }

  async presentToast(mensaje:string){
    this.toast= await this.toastCtrl.create({
     message:mensaje,
     position:"top",
     duration:4000,
     animated:true,
     color:'danger'
   });
   return this.toast.present();
 }

  async loadMap2(){
    const loading = await this.loadingController.create({
        message:'espere por favor...',
        spinner:'circular',
        duration:8000,

    });

  const myLatLog = {"lat" : -0.698236, "lng" : -80.094756};//{"lat" : -0.698236, "lng" : -80.094756};
  console.log("coordenadas de inicio",myLatLog);
  const mapEle :HTMLElement = document.getElementById('mapconfi'); // en esta linea construye el mapa en el div
  this.map = new google.maps.Map(mapEle,{
    center: myLatLog, 
    zoom:15,
    tilt: 60,
    bearing: 10,
    duration: 5000
  });

  google.maps.event.addListenerOnce(this.map,'idle',(data)=>{

    loading.dismiss();
    
  });

   // este evento se dispara  cuando se le da click al mapa
  google.maps.event.addListener(this.map,'click',(data)=>{
    const x:number = data.latLng.lat();
    const y:number = data.latLng.lng();
    this.addMarker(x,y,google);
  });

  }
  
  private markers:any[]=[];
  private polis : any[]=[];

  private async addMarker(lat:number,lng:number,google){
    
    const alert = await this.alertController.create({
      header: 'Punto de Referencia',
      inputs: [
        {
          name: 'descripcion',
          type: 'text',
          value: '',
          placeholder: 'Descripción del punto '
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            // this.loadMap();
            
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            
            if(data.descripcion!=""){
            console.log(lat,lng);
            const marker = new google.maps.Marker({
              position: {
                lat: lat,
                lng: lng
              },
              zoom:8,
              map:this.map,
              title:'data.descripcion',
              draggable: false,
              //animation:google.maps.Animation.BOUNCE // animacion
            });
            if(this.conta!=0){
              this.removeLine();
            }
            this.listaIdRutas=[];
            this.interes=[];
            this.polys=[];
            this.rutaCercana(lat,lng,'0','0');
            
            this._ubicacion.latitud=lat;
            this._ubicacion.longitud=lng;
            this.interes={'lng':this._ubicacion.latitud,'lat':this._ubicacion.longitud,'des':data.descripcion,'id': localStorage.getItem('idUser')};
           

            //console.log(marker);
            
            this.markers.forEach((item,a) => {
              item.setMap(null);
            });

            this.markers.push(marker);
          

            //Zoom a la zona del marker seleccionado
            google.maps.event.addListener(marker,'click',function() {
              //marker.setMap(null);
              this.map.setZoom(17);
              this.map.setCenter(marker.getPosition());
            }); 

            google.maps.event.addListener(marker,'dblclick',function() {
              marker.setMap(null);
              
            }); 
            
          }else{
            this.presentToast('Por favor llenar campo..');
          }  
          }
        }
      ]
    });

    await alert.present();

  }

  async onGuardar(){
     console.log(this.interes);
     console.log(this.listaIdRutas); 
    this.btnact='true';
    if(this.listaIdRutas.length==0 ){
      this.btnact='true';
      this.presentToast('Ninguna ruta asignada, por favor verifique e intente nuevamente');
    }else if(this._ubicacion.latitud!=null){ 
        const loading2 = await this.loadingController.create({
                      message:'',
                      spinner:'crescent',
        });
        loading2.present(); 

      this.puntoRuta.postPunto(this.interes).subscribe(
        data=>{ console.log(data);
                if(data=='error'){
                    loading2.dismiss();
                }else{
                  console.log(data);
                  this.listaIdRutas.forEach(item => {
                    let request = { 'ruta_idruta': item, 'idpunto_de_referencia':data};
                    console.log(request);
                    this.puntoRuta.postPuntoRuta(request).subscribe(
                        idpr=>{
                                console.log(idpr);
                                let noti={'idpunto_de_referencia_ruta':idpr,'idusuario':localStorage.getItem('idUser')}
                                this.puntoRuta.postNotificacion(noti).subscribe(
                                   datoNoti=>{  console.log(datoNoti); 
                                }); 
                        });

                    });

                    this.interes={};
                    this.listaIdRutas=[];
                    this.polys=[];
                    loading2.dismiss();
                    this.router.navigate(['/tabs']);
                }
        },error=>{
                loading2.dismiss();
                this.btnact='false';  
                this.presentToast('No se ha podido realizar el registro');
                setTimeout(()=>{ this.toast.dismiss(); },2000 );
      });

    }else{
          this.presentToast('Elija su punto de interés');
    }
    
  }
  


  async  rutaCercana(lat,lng,idp,idr){
  this.addBtn='true';
    this.conta=this.conta+1;
    const loading = await this.loadingController.create({
      message:'Buscando ruta...',
      spinner:'crescent',
    });
    loading.present();
    this.puntoRuta.GetRutaCercana(lat,lng,idp,idr).subscribe(data=>{
        this.addruta=data;
        console.log(this.addruta);
        this.btnact='false';
        this.addBtn='false';
        this.con=this.con+1;
        const arr:any []=[];
        console.log();
        
            data.ruta.forEach(item => {
              let nose = { lat: item.latitud, lng:item.longitud,};
              arr.push(nose);
            });

            if(this.con>3){this.con=0;}
               let poly = new google.maps.Polyline({
                path: arr,
                geodesic: true,
                strokeColor: this.colores[this.con],
                strokeOpacity: 0.6,
                strokeWeight: 5,
                
              });
              
               let n= this.polys.length;
               let l= this.listaIdRutas.length;
               console.log(n);
               console.log(l);
               
             //  this.listaIdRutas[l]=this.addruta.idruta;

              if(n<2){
                console.log('si');
                poly.setMap(this.map);
                this.polys[n]=poly;
                this.listaIdRutas[l]=this.addruta.idruta;
                //this.polys.splice(2);this.listaIdRutas.splice(2);
              }else{
                this.presentToast(' Lo sentimos solo puedes asignar dos rutas al punto de referencia ');
              }
               loading.dismiss();
  
    },error=>{loading.dismiss();});
  }
  removeLine() {
     this.polys.forEach((item,a) => {
      item.setMap(null);
    });
  }

  nuevaRuta(){
    this.rutaCercana(this.interes['lng'],this.interes['lat'],this.addruta.idpunto_ruta,this.addruta.idruta);
    // this.btnNuevaRuta='true';
  }
    
  deleteRuta(){
    
    let n=this.polys.length;
    this.polys[n-1].setMap(null);
    this.polys.pop();

    this.listaIdRutas.pop();
  
  }

}
