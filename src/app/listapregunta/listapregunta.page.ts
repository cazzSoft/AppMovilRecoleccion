import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestaService } from '../service/encuesta.service';
import { RespuestaService } from '../service/respuesta.service';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../component/popinfo/popinfo.component';


@Component({
  selector: 'app-listapregunta',
  templateUrl: './listapregunta.page.html',
  styleUrls: ['./listapregunta.page.scss'],
})
export class ListapreguntaPage implements OnInit {

  item:any;
  preguntas:any;
  resrequest:any[]=[];
  disabled=true;
  numeroPregunta:any;
    constructor(
      private router:Router,
      private encuesta:EncuestaService,
      private respuestaS: RespuestaService,
      private popoverController:PopoverController
      ) { }

  ngOnInit() {
    this.encuesta.$getObjectSource.subscribe(data=>{
      this.item=data;
  
      });
  
      this.encuesta.GetPreguntas(this.item.idevaluacion).subscribe(data=>{
        this.preguntas=data;
        this.numeroPregunta=data.length;
        
      });
  }

  respuesta(v:string,data:any){
    //this.disabled=false;
   
    let preRe={puntaje:v,idpregunta_evaluacion:data.idE_P,idusuario:parseInt(localStorage.getItem('idUser')),evaluacion_usuario:this.item.id};
   // const request={puntaje:d1,idpregunta_evaluacion:data.idpregunta_evaluacion,idusuario:parseInt(localStorage.getItem('idUser')), estado:"E"};
    
    let n=0;
    let ctr=0;
    this.resrequest.forEach(item => {
      if(item.idpregunta_evaluacion==data.idE_P){
          this.resrequest[n]={puntaje:v,idpregunta_evaluacion:data.idE_P,idusuario:parseInt(localStorage.getItem('idUser')),evaluacion_usuario:this.item.id};
          ctr=1;
      }else{
        
      }
      n=n+1;
    });

    if(ctr==0){
      this.resrequest.push(preRe);
    }
    if(this.numeroPregunta==this.resrequest.length){
      this.disabled=false;
      //alert(1);
    }
    console.log(this.resrequest);
    console.log(this.resrequest.length);
  }

  EnviarRespuesta(){
  
    //this.router.navigate(['tabs/tab4']);

    this.respuestaS.PostRespuesta(this.resrequest).subscribe(
      item=>{
        console.log(item);
        this.router.navigate(['/tabs/tab4']);
      },
      error=>{console.log(error)}
    );
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
