import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, Platform, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MapagpsService } from '../service/mapagps.service';
import { ModalInfoPage } from '../modal-info/modal-info.page';
declare var google;

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  dataInfo=null;
  map=null;
  chone = {"lat" : -0.698236, "lng" : -80.094756}; 
  accion: number=0;
  editPinteres: { lng: any; lat: any; des: any; id: string; };
   rutasNuevas: any;
   idr: number;
   datoRutasNuevas: number;
   toast: any;
   btnHorario=false;
  constructor(
               private loadingController:LoadingController,
               public loadingCtrl:LoadingController,
               private alertController: AlertController,
               public router:Router,
               public toastCtrl:ToastController,
               private serviceData:MapagpsService,
               private modalController:ModalController
               ) { }

  ngOnInit() {
    this.serviceData.$getObjectSourcePI.subscribe(data=>{
      this.dataInfo=data;
      this.editPinteres={'lng':this.dataInfo.longuitud,'lat':this.dataInfo.latitud,'des':this.dataInfo.descripcion,'id': localStorage.getItem('idUser')};
    });

    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create({message:'por favor espere...'});
    loading.present();
    const mapEle: HTMLElement = document.getElementById('mapconfiId'); 
    this.map = new google.maps.Map(mapEle, {
      center: this.chone,
      zoom: 14,
      tilt: 60,
    
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      loading.dismiss();
      let mark={'lat':this.dataInfo.latitud,'lng':this.dataInfo.longuitud,'tit':this.dataInfo.descripcion};
      this.crearMarkert(mark);
      //crear rutas y mostrarla
      this.serviceData.GetpuntoRutaId(this.dataInfo.idpunto_de_referencia).subscribe(puntosRutas=>{
        this.rutasNuevas=puntosRutas;
        console.log(this.rutasNuevas);
        this.rutasNuevas.forEach(item => {
          const rut:any []=[]; 
          item.forEach(item2 => {
            this.idr=item2.ruta_idruta;
            let array = { lat: item2.latitud, lng:item2.longitud};
            rut.push(array);
           
          });
        
           this.crearRutas(rut,this.idr);
          });
      });
     // this.crearRutas();
      
    });

  }

   private markers:any[]=[]
  //funcion para crear marke
  crearMarkert(mark:any){  
      let market=  new google.maps.Marker({
        position: {
          lat: mark.lng,
          lng: mark.lat
        },
        zoom:8,
        map:this.map,
        
        title:mark.tit,
        animation:google.maps.Animation.DROP // animacion
          
      });
      let content ="<img src='../assets/icon/referen.png' width='64' height='64'>"+"<br>"+"<b>"+mark.tit+"</b>";
      this.addInfoWindow(market, content);
      this.markers.forEach((item,a) => {
        item.setMap(null);
      });

      this.markers.push(market);
  }
    
  addInfoWindow(market: any, content: string) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(market, 'click', () => {
      infoWindow.open(this.map, market);
    });
  }

  //funcion para crear las rutas en el mapa
   colores=['#FF00FF',' #00FF7F','#1E90FF','#32CD32','#FF00FF'];
   con=0;
  async crearRutas(ruta:any,idr){    
    const poli = new google.maps.Polyline({
       path: ruta,
       geodesic: true,
       strokeColor: this.colores[this.con],
       strokeOpacity: 0.9,
       strokeWeight: 5,
       clickable: true,
       id:idr,
       
    });
    
    this.con=this.con+1;
    poli.setMap(this.map);
    this.listaIdRutas=idr; 

    
    if(this.con==0){this.con=5;}
  }

  listaIdRutas: any;
  colores2=['#FF00FF',' #00FF7F','#1E90FF','#32CD32','#FF00FF'];
    con2=5;
 
  actionPunto(){
    this.accion=0;

  }

  acionRuta(){
    this.accion=1;
  }

  async presentToast(mensaje:string){
    
    this.toast= await this.toastCtrl.create({
     message:mensaje,
     position:"top",
     duration:6000,
     animated:true,
     color:'tertiary'
   });
   return this.toast.present();
 }
 mm='';
 async mostrarHorarios(data){

   
  data.forEach(item => {
    this.mm=`Ruta: ${item.ruta} -- ${item.horario} <br> de ${item.hI} ${item.hF}`;
  });

  const alert = await this.alertController.create({
    header: 'Horario de recolección de la ruta',
    
    subHeader: data.ruta,
    message: this.mm,
    buttons: ['OK'],
    
  });

  await alert.present();
 
}


async horarios(){
console.log(this.dataInfo.idpunto_de_referencia);
  this.btnHorario=true;
  this.serviceData.getHorarios(this.dataInfo.idpunto_de_referencia).subscribe(async horarios=>{
    this.btnHorario=false;
    console.log(horarios);
   
    const modal = await this.modalController.create({
      component:ModalInfoPage,
        componentProps:{
        data:horarios
        
      }
    });
   modal.present();

  });
 
}




}
