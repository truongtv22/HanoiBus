import { Component, ElementRef } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'popover-transfer',
  templateUrl: 'popover-transfer.html'
})
export class PopoverTransfer {
  popoverContent: any;

  constructor(private el: ElementRef, public viewCtrl: ViewController) { }

  ionViewWillEnter() {
    let btnShowTransfer = document.getElementById('btnShowTransfer');
    let top = btnShowTransfer.getBoundingClientRect().top;
    let left = btnShowTransfer.getBoundingClientRect().left;
    let height = btnShowTransfer.getBoundingClientRect().height;

    let popoverContent = this.el.nativeElement.offsetParent;

    popoverContent.style.cssText = 'width: auto; opacity: 1; top: ' + (top + height) + 'px; left: ' + left + 'px';
  }

  chooseMaxTransfer(maxTransfer: number) {
    this.viewCtrl.dismiss({ maxTransfer: maxTransfer });
  }
}
