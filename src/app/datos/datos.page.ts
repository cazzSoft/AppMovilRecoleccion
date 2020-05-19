import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from './../component/popinfo/popinfo.component';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  constructor(private popoverController:PopoverController) { }
  datos;
  ngOnInit() {

    //localStorage.setItem('idUser',this.datos.id);
   
   this.datos={ 'nombre':localStorage.getItem('nombre'),
                'celular':localStorage.getItem('celular'),
                'cedula':localStorage.getItem('cedula'),
                'email':localStorage.getItem('email')
              };
   console.log(this.datos.nombre);
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
