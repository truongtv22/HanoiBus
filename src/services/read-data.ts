import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ReadData {
  routes: any;
  stations: any;

  constructor(public http: Http) { }

  loadRoutes() {
    if (this.routes) {
      // nếu đã tồn tại dữ liệu
      return Promise.resolve(this.routes);
    }

    // nếu dữ liệu chưa tồn tại
    return new Promise(resolve => {
      // sử dụng http để get dữ liệu json
      this.http.get('assets/data/routes.json').subscribe(res => {
        this.routes = res.json();
        resolve(this.routes);
      });
    });
  }

  filter(keyword) {
    return this.routes.filter(route => {
      return (route.RouteName.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
    });
  }

  loadStations() {
    if (this.stations) {
      // nếu đã tồn tại dữ liệu
      return Promise.resolve(this.stations);
    }

    // nếu dữ liệu chưa tồn tại
    return new Promise(resolve => {
      // sử dụng http để get dữ liệu json
      this.http.get('assets/data/stations.json').subscribe(res => {
        this.stations = res.json();
        resolve(this.stations);
      });
    });
  }
}
