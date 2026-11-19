import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RequestOptions} from "@angular/http";
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { StationDetail } from '../pages/station-detail/station-detail';

import { BlankPage } from '../pages/blank/blank';

import { ModalDirection } from '../pages/modal-direction/modal-direction';
import { PopoverTransfer } from '../pages/modal-direction/popover-transfer/popover-transfer';

import { SearchPlaces } from '../pages/search-places/search-places';

import { ModalResults } from '../pages/modal-results/modal-results';
import { InstructionPage } from '../pages/instruction/instruction';

import { ModalLookup } from '../pages/modal-lookup/modal-lookup';

import { RouteDetail } from '../pages/route-detail/route-detail';
import { TabStation } from '../pages/route-detail/tab-station/tab-station';
import { TabInformation } from '../pages/route-detail/tab-information/tab-information';

import { FeedbackPage } from '../pages/feedback/feedback';

import { ModalSmall } from '../directives/modal-small/modal-small';
import { IonPullUpComponent } from '../directives/ion-pullup/ion-pullup';
import { TabSwiper, TabsSwiper } from '../directives/ion-tabs-swiper/ion-tabs-swiper';

// Sử dụng DreamFactory
import { DfRequestOptions } from '../config/interceptors';

import { ReadData } from '../services/read-data';

@NgModule({
  declarations: [
    MyApp,

    HomePage,
    StationDetail,

    BlankPage,

    ModalDirection,
    PopoverTransfer,

    SearchPlaces,
    ModalResults,
    InstructionPage,

    ModalLookup,

    RouteDetail,
    TabStation,
    TabInformation,

    FeedbackPage,

    TabSwiper,
    TabsSwiper,

    ModalSmall,
    IonPullUpComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp, { mode: 'md' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    HomePage,
    StationDetail,

    BlankPage,

    ModalDirection,
    PopoverTransfer,

    SearchPlaces,
    ModalResults,
    InstructionPage,

    ModalLookup,

    RouteDetail,
    TabStation,
    TabInformation,

    FeedbackPage,

    TabSwiper,
    TabsSwiper,

    ModalSmall,
    IonPullUpComponent
  ],
  providers: [ReadData, {
    provide: RequestOptions,
    useClass: DfRequestOptions
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
