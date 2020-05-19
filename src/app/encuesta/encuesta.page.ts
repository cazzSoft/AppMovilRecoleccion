import { Component, OnInit } from '@angular/core';
import { EncuestaService} from '../service/encuesta.service';
import { RespuestaService} from '../service/respuesta.service';
import { Router } from '@angular/router';
import { PopinfoComponent } from './../component/popinfo/popinfo.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {

  lista:{};
  ListaEncuesta={

  };
  
  constructor(
    private encuesta:EncuestaService,
    private respuesta:RespuestaService,
    public router:Router,
    private popoverController:PopoverController
     
  ) { }

  ionViewDidEnter(){
    this.getEncuesta();
  }
  ionViewWillEnter(){
    this.getEncuesta();
  }
  ionViewWillUnload(){
    this.getEncuesta();
  }
  
  ngOnInit() {

    this.getEncuesta();
  }

  async getEncuesta(){
    this.encuesta.Getencuesta(localStorage.getItem('idUser')).subscribe(
      (data)=>{
        this.lista=data; 
      },
      (error)=>{console.log(error)}
    );
  }
  valorF(d1:String,data:any){
    
    console.log(data);
    console.log(d1);
    const request={puntaje:d1,idpregunta_evaluacion:data.idpregunta_evaluacion,idusuario:parseInt(localStorage.getItem('idUser')), estado:"E"};
     
    this.respuesta.PostRespuesta(request).subscribe(
      item=>{console.log(item)},
      error=>{console.log(error)}
    );

  }
  onClickEncuesta(item:any){
    this.encuesta.sendObjectSource(item);    
    this.router.navigate(['/listapregunta']);
  }

  async mostrarPopover(evento){
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      event:evento,
      mode:'ios'
    });

    return popover.present();
    
  }

  doRefreshEncuesta(event){
 
    setTimeout(() => {
      this.getEncuesta();
      event.target.complete();
    }, 5000);
  }

}
