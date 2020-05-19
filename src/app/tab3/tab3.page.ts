import { Component,OnInit } from '@angular/core';
import { OpinionService} from '../service/opinion.service';
import { ToastController,LoadingController, PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../component/popinfo/popinfo.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  desOpinion="";
  btnOpi='false';
  toast:any;
  contO=0;
  constructor(
              private opinion:OpinionService,
              public toastCtrl:ToastController,
              public loadingController: LoadingController,
              private popoverController:PopoverController
              ) {}
  
  ngOnInit(  ){

    this.desOpinion="";
  }
  ionViewDidEnter(){
    this.desOpinion="";
  }

  async presentToast(mensaje:string){
    this.toast= await this.toastCtrl.create({
     message:mensaje,
     position:"bottom",
     duration:4000,
     animated:true,
     color:'tertiary'
   });
   return this.toast.present();
 }

  async EnviarOpinion(){
    
    this.contO=this.contO+1;
   this.btnOpi='true';
    console.log(this.contO);
      if(this.desOpinion!=""){
        if(this.contO<5){
          const opinion={detalle:this.desOpinion,id:parseInt(localStorage.getItem('idUser'))};

          this.opinion.PostOpinion(opinion).subscribe (
            data=>{
                    console.log(data);
                    if(data=='success'){
                      this.desOpinion="";
                      setTimeout(()=>{
                            this.btnOpi='false';
                            this.presentToast('Tu opinión ha sido envíada con éxito ');
                          },100         
                      );
                    }
                    if(data=='danger'){
                      
                      setTimeout(()=>{
                            this.btnOpi='false';
                            this.presentToast('Error intente nuevamente..');
                          },100         
                      );
                    }
                    if(data=='error'){
                     
                      setTimeout(()=>{
                            this.btnOpi='false';
                            this.presentToast('No se aceptan caracteres especiales');
                          },100         
                      );
                    } 
            },
            (error)=>{
                     this.btnOpi='false';
                      setTimeout(()=>{
                            this.presentToast(error);
                          },100         
                      );
            });
        }else{
          setTimeout(()=>{
            this.btnOpi='false';
            this.presentToast('Lo sentimos ha Excedió la cantidad de opiniones ');
          },100         
      );
        }
      }else{
        this.btnOpi='false';
        this.presentToast('Por favor llenar campo..');
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
