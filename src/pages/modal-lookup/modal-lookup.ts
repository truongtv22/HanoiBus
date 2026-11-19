import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RouteDetail } from '../route-detail/route-detail';

import { ReadData } from '../../services/read-data';

@Component({
  selector: 'modal-lookup',
  templateUrl: 'modal-lookup.html'
})
export class ModalLookup {
  routes: any;
  keyword: string = '';

  constructor(public readData: ReadData, public navCtrl: NavController) {
    this.init();
  }

  init() {
    let self = this;

    this.readData.loadRoutes().then(data => {
      self.routes = data;
    });
  }

  goRouteDetail() {
    this.navCtrl.push(RouteDetail);
  }

  search() {
    this.routes = this.readData.filter(this.keyword);
  }
}
