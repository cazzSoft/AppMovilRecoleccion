import { Component, OnInit } from '@angular/core';
import { NavController,ToastController,LoadingController } from '@ionic/angular';
import {AutenticateService} from '../service/autenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario={dni:'',password:'',idUser:''};
  datos:any;
  toast:any;
  constructor(
              public router:Router,
              public toastCtrl:ToastController,
              private autenticate:AutenticateService,
              public loadingController: LoadingController
              ) { }

  ngOnInit() {
    this.usuario={dni:'',password:'',idUser:''};
  }

  async presentToast(mensaje:string){
    this.toast= await this.toastCtrl.create({
      message:mensaje,
      position:"top",
      duration:6000,
      animated:true,
      color:'danger'
   });
   return this.toast.present();
  }


  async onSubmitTemplate(){
    const loading = await this.loadingController.create({
           message:'Espere un momento por favor',
           spinner:"bubbles"
           
    });
       loading.present();
  
    const user={usuario:this.usuario.dni,clave:this.usuario.password};
    const reuest=this.autenticate.GetAutenticateValidate(user).subscribe(
    (item)=>{
              this.datos=item;
          
              console.log(this.datos);
              //guardamos datos locales
              localStorage.setItem('idUser',this.datos.id);
              localStorage.setItem('celular',this.datos.celular);
              localStorage.setItem('nombre',this.datos.nombre);
              localStorage.setItem('cedula',this.datos.cedula);
              localStorage.setItem('email',this.datos.email);
              localStorage.setItem('ctrOpinion','5');
              
              if(this.datos=='404'){
                 loading.dismiss();
                 // this.router.navigate(['/actualizacion']); 
                  this.presentToast('Error datos inconsistentes');
                  this.usuario.dni="";
                  this.usuario.password="";
                  setTimeout(()=>{
                    
                    this.toast.dismiss(); 
                  },2000         
                  );
                      
              }else{
                loading.dismiss();
                
                if(this.datos.estado_confi!=0){
                   this.router.navigate(['/tabs']);
                }else{
                   this.router.navigate(['/slider']);
                }
              }
              
      },(error)=>{
              
               //this.router.navigate(['/actualizacion']);
              loading.dismiss();
              this.presentToast('Error de conexión');
              setTimeout(()=>{
                   loading.dismiss();
              },1000         
              );
               setTimeout(()=>{
                this.toast.dismiss();
              },1000         
          ); 
      });
       
    
  }
  registrar(){
    this.router.navigate(['/registro']);
  }

}
