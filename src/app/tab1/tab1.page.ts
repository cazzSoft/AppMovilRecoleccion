import { Component } from '@angular/core';
import { LoadingController,PopoverController} from '@ionic/angular';
declare var google: any;
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { PopinfoComponent } from './../component/popinfo/popinfo.component';
import { interval } from 'rxjs';


import{MapagpsService} from '../service/mapagps.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  carrr:any[]=[];
  map=null;
  total:any;
  //markers:Marker[]=[];
  puntosReferencia:any[]=[];
  rutasM:any[]=[];
  idR=0;
  carross:any[]=[];
  chone = {"lat" : -0.698236, "lng" : -80.094756}; 
  timerVar;
  con=0;
  ctrnotifi=0;
  colores=['1E90FF','00FF7F','FF00FF','32CD32','FF00FF'];
  

  constructor(private localNotifications:LocalNotifications, public loadingCtrl:LoadingController, private gpsmapa:MapagpsService,public popoverController: PopoverController) { }

  ngOnInit(){
  
    this.getPuntosReferencia();
  
    interval(40000).subscribe(x => {
      if( localStorage.getItem('idUser')!=''){
         this. actualizarRecolectores();
      }else{
        clearInterval();
      }
    
     });
  }
  // ionViewWillEnter(){
  //   this.getPuntosReferencia();
  // }

  getPuntosReferencia(){
    this.ctrnotifi=0;
    this.gpsmapa.GetpuntoInteres(localStorage.getItem('idUser')).subscribe(
      (dataMark)=>{
             this.puntosReferencia=dataMark;
              this.loadMap();  
      }
    );
  }


  async loadMap() {
    const loading = await this.loadingCtrl.create({message:'por favor espere...'});
    loading.present();
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = {lat: -0.700348, lng: -80.092581}; 
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 14,
      tilt: 60,
    
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      loading.dismiss();
      

      this.puntosReferencia.forEach(item => { 
        
        this.gpsmapa.GetpuntoRutaId(item.idpunto_de_referencia).subscribe(pnt=>{
          this.rutasM=pnt;
         //this.con=0;
          this.rutasM.forEach((item,a) => {
            this.idR=0;
            const rut:any []=[]; 
            item.forEach(item2 => {
            //  console.log(item2);
              this.idR=item2.ruta_idruta;
              let array = { lat: item2.latitud, lng:item2.longitud};
              rut.push(array);
              //console.log(rut);
            });
            //console.log(this.idR);
            
             this.mostrarRutas(rut,this.idR,this.colores[a]);
             this.con=this.con+1;
            });
        });
        let mak={'lat':item.latitud,'lng':item.longuitud,'tit':item.descripcion,'idPR':item.idpunto_de_referencia}
          this.crearMarkert(mak);
      });
      //mostramos los carros recolectores
      this.actualizarRecolectores();
     
    });
    
  }

  //actualizar referencia de recolectores
  actualizarRecolectores(){
    this.gpsmapa.GetCarros(localStorage.getItem('idUser')).subscribe(recolet=>{
      this.boorrarCarros();
      console.log(recolet);
      this.carrr=recolet;
      this.carrr.forEach((item,a) => {
        
        let makC={'lat':item.lat,'lng':item.lng,'tit':item.des,'idr':item.idr,'idPRR':item.idPRR,url:this.colores[a]}
        //this.crearMarkertCarros(makC,item.distancia_metros);
        //CALCULAMOS METROS DEL CARRO
        
          let log1 = item.latitud;
          let lat1 = item.longuitud;
          let log2 = item.lng;
          let lat2 =item.lat;
      
          this.total = this.calculateDistance(log1 , log2, lat1,lat2);
          console.log(this.total);
          this.crearMarkertCarros(makC,item.distancia_metros,this.total);
          if(this.total<=item.distancia_metros){
              if(item.estadoPR){
                if(item.notiEstado){
                  this.ctrnotifi=this.ctrnotifi+1;
                  // console.log(this.ctrnotifi);
                  // console.log(item.cantidad);
                    if(this.ctrnotifi<=item.cantidad){
                      this.notificacion();
                    }
                }
              }
          }
      });
    });
  }

   //funcion para crear las rutas en el mapa
  async mostrarRutas(ruta:any,idr,color){    
    if(this.con>3){this.con=0;}
    const poli = new google.maps.Polyline({
      path: ruta,
      geodesic: true,
      strokeColor: '#'+color,
      strokeOpacity: 0.9,
      strokeWeight: 5,
      clickable: true,
      id:idr,
      
    });
    this.con=this.con+1;
  poli.setMap(this.map);
  
  if(this.con==0){this.con=5;}
  }

  //funcion para crear marke carros
  crearMarkertCarros(mark:any,distancia:any,actual){
    
    if(this.con>3){this.con=0;}
      let carros=  new google.maps.Marker({
          position: {
            lat: mark.lat,
            lng: mark.lng
          },
          zoom:8,
          map:this.map,
          
          icon: { url:`../assets/icon/${mark.url}.png`,
          scaledSize: new google.maps.Size(40, 50) },
          title:mark.tit,
          
        });
        this.con=this.con+1;
        this.carross.push(carros);
        console.log(mark.url);
        let content ="<center><img src='../assets/icon/noti.png' width='20' height='20'> <br> <b>"+mark.tit+"</b><br>Notificar: "+distancia+" metros <br> Distancia actual: "+actual+" metros</center>";
        this.addInfoWindow(carros, content);
  }

   //funcion para crear marke
  crearMarkert(mark:any){
    console.log('PR');
    console.log(mark);
      
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
        let content ="<img  src='../assets/icon/referen.png' width='64' height='64'>"+"<br>"+"<b>"+mark.tit+"</b>";
        this.addInfoWindow(market, content);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  async mostrarPopover(evento){
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      event:evento,
      mode:'ios'
    });

    return popover.present();
    
  }
  doRefresh(event) {
    this.con=0;
    setTimeout(() => {
     this.getPuntosReferencia();
      event.target.complete();
    }, 2000);
  }

  boorrarCarros(){
   
    if(this.carross==null){
      console.log(1);
    }else{
      console.log(0);
      this.carross.forEach((item,a) => {
        item.setMap(null);
     });
     this.carross=[];
    }
  
  }

  calculateDistance(lon1:any, lon2:any, lat1:any, lat2:any){
      let p = 0.017453292519943295;
      let c = Math.cos;
      let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((lon1- lon2) * p))) / 2;
      let dis = (12742 * Math.asin(Math.sqrt(a)));
      return Math.floor(dis*1000);
  }
  


  notificacion(){
     this.localNotifications.schedule({
        title: 'Notificación de recolección ',
        text: 'Es hora de sacar la basura carro recolector se está aproximando',
        icon: '../assets/icon/img.png',
        vibrate: true,
        foreground:true,
        attachments: ['../assets/icon/img.png'],
       
    });
  
  }

}
