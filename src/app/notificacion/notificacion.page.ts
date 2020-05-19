import { Component, OnInit, ViewChild } from '@angular/core';
import { MapagpsService } from '../service/mapagps.service';
import { IonList, ToastController, AlertController, PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../component/popinfo/popinfo.component';


@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {

  @ViewChild('listasRutasNoti',{static:false}) listasRutasNoti:IonList;

  constructor( public serviceNotificacion:MapagpsService,public toastCtrl:ToastController,private alertController: AlertController,private popoverController:PopoverController) { }


  rutas:any;
  puntoIntere:any;
  toast:any;
  ngOnInit() {

    this.obtenerRutaNofi();
    this.obtenerPuntosInteresNotifi();

  }

  async obtenerRutaNofi(){
    this.serviceNotificacion.getNotificacion(localStorage.getItem('idUser')).subscribe(
      item=>{
              this.rutas=item;
              console.log(this.rutas);
      },error=>{
        console.log('error');
      }
    );
  }

  async obtenerPuntosInteresNotifi(){
    this.serviceNotificacion.getPuntoInteres(localStorage.getItem('idUser')).subscribe(
      item=>{
            this.puntoIntere=item;
            console.log(this.puntoIntere);
      },error=>{
        console.log('error');
      }
    );
  }

  async presentToast(mensaje:string){
    
    this.toast= await this.toastCtrl.create({
     message:mensaje,
     position:"bottom",
     duration:5000,
     animated:true,
     color:'tertiary'
   });
   return this.toast.present();
 }

 async ver(item){
    console.log(item);
    this.listasRutasNoti.closeSlidingItems();
    
    const alert = await this.alertController.create({
      header: 'Detalle de la ruta',
      subHeader: item.ruta,
      message: item.descripcion,
      buttons: ['OK']
    });

    await alert.present();

    
  }
 
   

  async add(item){
    console.log(item);
    this.listasRutasNoti.closeSlidingItems();
    const alert = await this.alertController.create({
      header: 'Distancia a notificar en metros',
      inputs: [
        {
          name: 'distancia',
          type: 'number',
          placeholder: 'Ejemplo: 300'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
           // console.log('Confirm Ok :' , data);
            this.distancia(data,item);
          }
        }
      ]
    });
    await alert.present();
  }

  async activarEstado(item){
    let estado;
    if(item.estado){ estado=1;}else{estado=0;}
    let data={'estado':estado,'idnotificacion':item.idnotificacion};
    this.listasRutasNoti.closeSlidingItems();
    this.serviceNotificacion.updateNotificacionRuta(data).subscribe(
      data=>{
            console.log(data);
            if(data=='1'){
              this.presentToast('Notificación de la ruta activada');
            }else{
              this.presentToast('Notificación de la ruta desactivada');
            }
      },error=>{

      }
    );
  }

  escojer(item){
      this.serviceNotificacion.updateNotificacionPunto(item).subscribe(
        request=>{
        },error=>{
          console.log('error');
        }
      );
      console.log(item);
      if(item.estado==true){
        this.presentToast('Punto de interés activado');
      }else{
        this.presentToast('Punto de interés desactivado');
      }
  }

  distancia(data:any,item:any){
    if(data.distancia!=""){
        if(data.distancia<=5){
          this.presentToast('Te recordamos que una distancia menor a 5 metros no podemos notificarte, asegúrate de ingresar una distancia prudente..' );
        }else{
          let request={'distancia':data.distancia,'idnotificacion':item.idnotificacion};
          this.serviceNotificacion.updateNotificacionDistancia(request).subscribe(
            re=>{ console.log(re);
                    if(item!='error'){
                      this.presentToast('Guardado con exito..');
                      this.obtenerRutaNofi();
                    }else{
                      this.presentToast('Error al guardar intente nuevamente.');
                    }
            },error=>{
                 this.presentToast('Ha ocurrido un error..');
            }
          ); 
        }
    }else{
      this.presentToast('Debes llenar el campo');
    }
    
  }
  
  async mostrarPopover(evento){
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      event:evento,
      mode:'ios'
    });

    return popover.present();
    
  }

}
