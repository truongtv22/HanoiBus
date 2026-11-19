import { Component } from '@angular/core';
import { Platform,
  AlertController,
  ModalController,
  ActionSheetController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

import { ModalLookup } from '../modal-lookup/modal-lookup';
import { ModalDirection } from '../modal-direction/modal-direction';

import { StationDetail } from '../station-detail/station-detail';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  isOnMap: boolean = false;

  constructor(public platform: Platform,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController
  ) {
    platform.ready().then(() => {
      // load map khi khởi động xong
      this.loadMapJS();
    });
  }

  loadMapJS() {
    let mapEle = document.getElementById('map');
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

  loadMap() {
    let latLng = new GoogleMapsLatLng(10.762722, 106.682324);

    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'indoorPicker': true,
        'zoom': false
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': latLng,
        'tilt': 30,
        'zoom': 16,
        'bearing': 50
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => { });
  }

  showAction() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'BusMap - Xe buýt thành phố',
      cssClass: 'action-sheets',
      buttons: [
        {
          text: 'Cập nhật dữ liệu xe buýt',
          icon: 'cloud-download',
          handler: () => {
          }
        },
        {
          text: 'Tải bản đồ Offline',
          icon: 'map'
        },
        {
          text: 'Chọn ngôn ngữ (Language setting)',
          icon: 'md-globe'
        },
        {
          text: 'Báo cáo xe buýt vi phạm',
          icon: 'md-warning'
        },
        {
          text: 'Đánh giá ứng dụng',
          icon: 'md-star'
        },
        {
          text: 'Góp ý/Liên hệ BusMap',
          icon: 'mail'
        },
        {
          text: 'Thông tin tác giả',
          icon: 'md-alert'
        }
      ]
    });

    actionSheet.present();
  }

  showAbout() {
    let alertAbout = this.alertCtrl.create({
      title: `BusMap<br>Xe buýt thành phố`,
      subTitle: `
        <small>
          * Phiên bản: 1.8<br>
          * Tác giả: Lê Yên Thanh (BusMapTeam) - ĐH Khoa học Tự nhiên, ĐHQG Tp. Hồ Chí Minh<br>
          * Dữ liệu xe buýt Tp. Hồ Chí Minh của ứng dụng này được sự hỗ trợ thông tin từ Trung tâm quản lý và điều hành vận tải hành khách công cộng, trực thuộc sở GTVT Tp. Hồ Chí Minh
        </small>
      `,
      buttons: ['Đóng'],
      cssClass: 'alert-about'
    });

    alertAbout.present();
  }

  showLookup() {
    let modalLookup = this.modalCtrl.create(ModalLookup);

    modalLookup.present();
  }

  showDirection() {
    let modalDirection = this.modalCtrl.create(ModalDirection);

    modalDirection.onDidDismiss(data => {
      if (data && data.status == true) this.isOnMap = true;
    });

    modalDirection.present();
  }

  hideFooter() {
    this.isOnMap = false;
  }

  showStationDetail() {
    let stationDetail = this.modalCtrl.create(StationDetail);

    stationDetail.present();
  }
}
