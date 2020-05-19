import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {
  @Input() data;
  constructor(private modalController: ModalController ) { }

  ngOnInit() {
    console.log(this.data);
  }


  salirSinArgumentos(){
    this.modalController.dismiss();
  }

}
