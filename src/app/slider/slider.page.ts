import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {

  ocultar ='';
  nombreUser;
  btnEm='true';
  slides=[
    {
      img: '/assets/slides/s2.png',
      titulo: 'PASO 1',
      sub:'Seleccione su punto de referencia',
      desc: `Busque en el mapa su lugar de referencia (Ej. Hogar, trabajo, etc.), después seleccionar “dando clic”·<br><br><br>`
    }
    ,
    {
      img: '/assets/slides/s3.png',
      titulo: 'PASO 2',
      sub:'Nombrar el punto de referencia',
      desc: `
              Posteriormente de seleccionar el lugar de preferencia se mostrará una ventana donde debes asignarle una descripción (Ej. Casa, Tienda, etc.).  
             `
    },
    {
      img: '/assets/slides/s4.png',
      titulo: 'PASO 3',
      sub:'Ruta asignada',
      desc: `
             Luego, se mostrará el punto asociado a una ruta cercana,<br><b>Recuerde:</b> Ud. Podrá asignar máximo dos rutas. <br>
             <b>Ruta 2.</b>  Seleccione el Icono rojo donde deberá elegir la segunda opción. Y si desea eliminar la ruta deberá seleccionar la opción uno.
             `
    },
  
    {
      img: '/assets/slides/ss4.png',
      titulo: 'PASO 4',
      sub:'Guardar',
      desc: 'El siguiente paso será dar clic en guardar.<p> Esta configuración le permitirá recibir notificaciones del Carro Recolector de Desechos que estén aproximándose a su punto de referencia. </p>'
    }
  ];
  

  constructor(private navController:NavController,private router:Router) { }

  ngOnInit() {
  this.nombreUser=  localStorage.getItem('nombre');
    if(this.nombreUser){
     this.btnEm='false';
    }else{
      this.btnEm='true';
    }
  }
  onClick(){
    this.ocultar = 'animated fadeOut fast';
    this.navController.navigateBack('/tabs');
  }

  btnclick(){
    this.router.navigate(['/actualizacion']);
  }

}
