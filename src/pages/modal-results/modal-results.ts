import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InstructionPage } from '../instruction/instruction';

@Component({
  selector: 'modal-results',
  templateUrl: 'modal-results.html'
})
export class ModalResults {
  constructor(public navCtrl: NavController) { }

  showInstruction() {
    this.navCtrl.push(InstructionPage);
  }
}
