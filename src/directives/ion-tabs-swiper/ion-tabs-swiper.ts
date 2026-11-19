import { Input, ViewChild, Component } from '@angular/core';
import { Tabs, Slide, Slides, Events } from 'ionic-angular';

import { BlankPage } from '../../pages/blank/blank';

@Component({
  selector: 'ion-tabs-swiper',
  template: `
    <ion-tabs color='primary' #myTabs (ionChange)='onTabsChange($event)' [tabsHighlight]='tabsHighlight' [tabsPlacement]='tabsPlacement'>
      <ion-tab *ngFor='let tabTile of tabsTitle' [root]='blank' [tabTitle]='tabTile'></ion-tab>
    </ion-tabs>
    <ion-slides #mySlider (ionDidChange)='onSlideChanged()'>
      <ng-content></ng-content>
    </ion-slides>
  `,
  viewProviders: [Tabs, Slides]
})
export class TabsSwiper {
  blank: any = BlankPage;
  tabsTitle = [];

  tabIndex: number = 0;
  slideIndex: number = 0;

  @Input() tabsHighlight;
  @Input() tabsPlacement;

  @ViewChild('myTabs') tabs: Tabs;
  @ViewChild('mySlider') slider: Slides;

  constructor(public events: Events) {
    this.events.subscribe('tab:tabTile', (tabTile) => {
      this.tabsTitle.push(tabTile[0]);
    });
  }

  ngOnInit() {
    this.tabsHighlight = this.tabsHighlight || 'true';
    this.tabsPlacement = this.tabsPlacement || 'top';
  }

  onTabsChange(tab) {
    this.tabIndex = this.tabs.getIndex(tab);

    if (this.tabIndex != this.slideIndex) this.slider.slideTo(this.tabIndex);
    return;
  }

  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();

    if (this.tabIndex != this.slideIndex) this.tabs.select(this.slideIndex);
    return;
  }
}

@Component({
  selector: 'ion-tab-swiper',
  template: `
    <ion-slide>
      <ng-content></ng-content>
    </ion-slide>
  `,
  viewProviders: [Slide, Slides]
})
export class TabSwiper {
  @Input() tabTitle;

  constructor(public events: Events) { }

  ngOnInit() {
    this.events.publish('tab:tabTile', this.tabTitle);
  }
}
