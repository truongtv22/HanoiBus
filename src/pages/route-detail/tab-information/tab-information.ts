import { Component } from '@angular/core';

import { ReadData } from '../../../services/read-data';

@Component({
  selector: 'tab-information',
  templateUrl: 'tab-information.html'
})
export class TabInformation {
  route: any = {};

  constructor(public readData: ReadData) {
    this.init();
  }

  init() {
    let self = this;

    this.readData.loadRoutes().then(data => {
      self.route = data.filter(r => {
        return (r.RouteId == 1);
      })[0];
    });
  }
}
