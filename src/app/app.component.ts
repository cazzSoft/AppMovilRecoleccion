import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { MapagpsService } from './service/mapagps.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private servicio:MapagpsService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
   
    if(localStorage.getItem('nombre')){
      this.servicio.GetpuntoInteres(localStorage.getItem('idUser')).subscribe(
        data=>{ 
              if(data.length==0){
                 this.router.navigate(['/slider']);
                }else{
                  this.router.navigate(['/tabs']);
                }
        });
       
    }else{
       this.router.navigate(['/']);
    
    }
  }
}
