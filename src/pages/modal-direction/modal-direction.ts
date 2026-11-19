import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, PopoverController } from 'ionic-angular';

import { SearchPlaces } from '../search-places/search-places';
import { ModalResults } from '../modal-results/modal-results';
import { PopoverTransfer } from './popover-transfer/popover-transfer';

@Component({
  selector: 'modal-direction',
  templateUrl: 'modal-direction.html',
})
export class ModalDirection {
  maxTransfer: number = 2;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController
  ) { }

  showSearchPlaces() {
    this.navCtrl.push(SearchPlaces);
  }

  showResults() {
    let modalResults = this.modalCtrl.create(ModalResults);

    modalResults.present();
  }

  exitModal() {
    this.viewCtrl.dismiss();
  }

  chooseOnMap() {
    this.viewCtrl.dismiss({ status: true });
  }

  showTransfer() {
    let popoverTransfer = this.popoverCtrl.create(PopoverTransfer);

    popoverTransfer.onDidDismiss(data => {
      if (data) this.maxTransfer = data.maxTransfer;
    });

    popoverTransfer.present();
  }
}
