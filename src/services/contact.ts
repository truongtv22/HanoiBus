import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { BaseHttpService } from './base-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as constants from '../config/constants';

@Injectable()
export class ContactService {
  baseUrl: string = constants.URL + '/api/v2/db/_table/contact';

  constructor(private httpSrv: BaseHttpService) { }

  query(params?: URLSearchParams): Observable<any> {
    return this.httpSrv.http
      .get(this.baseUrl, { search: params })
      .map((resp) => {
        let res: any = resp.json();
        let objs: Array<any> = [];

        res.resource.forEach((obj) => {
          objs.push(obj);
        });

        return objs;
      });
  }
}
