import { Component } from '@angular/core';
import { Events, Platform } from 'ionic-angular';

import { IonPullUpFooterState } from '../../directives/ion-pullup/ion-pullup';

declare var google: any;

@Component({
  selector: 'route-detail',
  templateUrl: 'route-detail.html'
})
export class RouteDetail {
  map: any;

  direction: number = 1;
  nameDirection: string = 'Lượt đi';

  pullupState: IonPullUpFooterState;

  constructor(public events: Events, public platform: Platform) {
    platform.ready().then(() => {
      // load map khi khởi động xong
      this.loadMapJS();
    });

    this.pullupState = IonPullUpFooterState.Minimized;
  }

  loadMapJS() {
    let mapEle = document.getElementById('map-elastic');
    let latLng = new google.maps.LatLng(10.762722, 106.682324);

    let mapOptions = {
      zoom: 15,
      center: latLng,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{
        featureType: 'transit.station.bus',
        stylers: [
          { visibility: 'off' }
        ]
      }]
    };

    this.map = new google.maps.Map(mapEle, mapOptions);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show');
    });
  }

  toggleDirection() {
    if (this.direction == 1) {
      this.direction = 0;
      this.nameDirection = 'Lượt về';
    } else {
      this.direction = 1;
      this.nameDirection = 'Lượt đi';
    }

    this.events.publish('direction', this.direction);
  }

  togglePullupState() {
    this.pullupState = (this.pullupState == IonPullUpFooterState.Minimized) ? IonPullUpFooterState.Collapsed : IonPullUpFooterState.Minimized;
  }
}
