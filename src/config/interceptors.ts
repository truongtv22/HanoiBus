import { BaseRequestOptions } from '@angular/http';
import * as constants from './constants';

export class DfRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
    this.headers.set('X-Dreamfactory-API-Key', constants.API_KEY);
    this.headers.set('Content-Type', 'application/json');
  }
}
