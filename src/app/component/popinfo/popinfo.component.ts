import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { interval } from 'rxjs';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  constructor(public router:Router,private popoverCtrl:PopoverController) { }

  ngOnInit() {}


  cerrar(){
    this.popoverCtrl.dismiss();
    localStorage.setItem('idUser','');
    localStorage.setItem('celular','');
    localStorage.setItem('nombre','');
    localStorage.setItem('cedula','');
    localStorage.setItem('email','');
    this.router.navigate(['/login']);
    clearInterval();
  }
  configuracion(){
    this.popoverCtrl.dismiss();
    this.router.navigate(['/tabs/tab2']);
  }

  
}
