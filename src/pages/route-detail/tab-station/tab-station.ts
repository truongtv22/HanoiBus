import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

import { ReadData } from '../../../services/read-data';

@Component({
  selector: 'tab-station',
  templateUrl: 'tab-station.html'
})
export class TabStation {
  route: any = {};
  stations: any = [];
  idxChecked: number = 0;

  constructor(public events: Events, public readData: ReadData) {
    this.init();

    events.subscribe('direction', (direction) => {
      this.changeDirection(direction[0]);
    });
  }

  init() {
    let self = this;

    this.readData.loadRoutes().then(data => {
      self.route = data.filter(r => {
        return (r.RouteId == 1);
      })[0];

      self.stations = self.route.Go.split(' - ');
    });
  }

  changeDirection(numDirection) {
    if (numDirection == 1) {
      this.stations = this.route.Go.split(' - ');
    }
    else {
      this.stations = this.route.Re.split(' - ');
    }
  }

  chooseStation(index: number) {
    this.idxChecked = index;
  }
}
