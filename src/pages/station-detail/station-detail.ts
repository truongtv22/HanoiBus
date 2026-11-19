import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'station-detail',
  templateUrl: 'station-detail.html'
})
export class StationDetail {
  constructor(public viewCtrl: ViewController) { }

  back() {
    this.viewCtrl.dismiss();
  }
}
