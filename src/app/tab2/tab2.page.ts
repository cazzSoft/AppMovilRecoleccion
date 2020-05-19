import { Component, OnInit, ViewChild  } from '@angular/core';
import { ConfiguracionService } from '../service/configuracion.service';
import { Router } from '@angular/router';
import { PopoverController, IonList, LoadingController, ToastController } from '@ionic/angular';
import { PopinfoComponent } from '../component/popinfo/popinfo.component';
import { MapagpsService } from '../service/mapagps.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('listasRutasRefer',{static:false}) listasRutasRefer:IonList;
  listaPunto:any;
  toast: any;
  constructor( private toastCtrl:ToastController, private serviConfig:ConfiguracionService,public router:Router, private popoverController:PopoverController,private mapaService:MapagpsService,private loadingCtrl:LoadingController) {}
  
  ngOnInit(){
      this.puntosRefer();
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

  ionViewDidEnter(){
    this.puntosRefer();
  }

  async puntosRefer(){
  this.serviConfig.getPuntosFerencia(localStorage.getItem('idUser')).subscribe(data=>{
    this.listaPunto=data;
    console.log(data);
  },(error)=>{this.presentToast('Sin conexión..');});
  }

  irDatos(){
    this.router.navigate(['/datos']);
  }

  irConfig(dato:any){
    console.log(dato);
    this.mapaService.sendObjectSourcePuntoInteres(dato);  
     this.router.navigate(['/configuracion']);
  }

  masPuntos(){
  
    let i=0;
    this.listaPunto.forEach(item=> {
      i=i+1;
    });
    console.log(i);
    if(i<3){this.router.navigate(['/actualizacion']);}else{
      this.presentToast('Lo sentimos solo se permiten hasta tres puntos de referencia.');
    }
   
  }
  
  irNotificacion(){
    this.router.navigate(['/notificacion']);
  }

  async mostrarPopover(evento){
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      event:evento,
      mode:'ios'
    });

    return popover.present();
    
  }

  async  eliminarP(dato:any){
  
    this.listasRutasRefer.closeSlidingItems();
    const loading = await this.loadingCtrl.create({message:'por favor espere...'});
    loading.present();
    this.mapaService.deletePuntoRuta(dato.idpunto_de_referencia).subscribe(request=>{
        this.puntosRefer();
        console.log(request);
        loading.dismiss();
    },error=>{
      console.log(error);
      this.puntosRefer();
      loading.dismiss();
    });
    
  }

}
