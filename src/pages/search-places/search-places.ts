import { ViewChild, Component, ElementRef } from '@angular/core';
import { Navbar } from 'ionic-angular';

@Component({
  selector: 'search-places',
  templateUrl: 'search-places.html'
})
export class SearchPlaces {
  keyword: string = '';

  @ViewChild(Navbar) childNavbar: Navbar;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.updateUI();

    window.addEventListener('resize', () => {
      this.updateUI();
    });
  }

  updateUI() {
    let ionItems = this.el.nativeElement.querySelectorAll('ion-list [ion-item]');
    let ionListHeader = this.el.nativeElement.querySelector('ion-list ion-list-header');
    let heightBeauty = this.el.nativeElement.clientHeight - this.childNavbar._elementRef.nativeElement.offsetHeight - ionListHeader.clientHeight - 16;
    let ionScroll = this.el.nativeElement.querySelector('ion-list ion-scroll');
    let heightCurrent = (ionItems.length * ionItems[0].clientHeight > heightBeauty) ? heightBeauty : ionItems.length * ionItems[0].clientHeight;

    ionScroll.style.height = heightCurrent + 'px';
  }
}
