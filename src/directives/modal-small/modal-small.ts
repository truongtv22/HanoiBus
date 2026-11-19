import { Input, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'modal-small',
  template: '<ng-content></ng-content>'
})
export class ModalSmall {
  @Input() width: number = 80;
  @Input() height: number = 90;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // lấy các thẻ modal phụ thuộc
    let modalActive = this.el.nativeElement.parentElement;
    let modalWrapper = modalActive.parentElement;
    let modalBackdrop = modalWrapper.parentElement.firstElementChild;

    // kiểm tra nếu là modal
    if (modalWrapper.className == 'modal-wrapper') {
      modalBackdrop.style.cssText = 'visibility: visible';
      modalWrapper.style.cssText = 'position: absolute; top: 0; left: 0; width: auto; height: 100%';
      modalActive.style.cssText = 'position: absolute; top: calc(50% - ' + (this.height / 2) + 'vh); left: calc(50% + ' + (100 - this.width) / 2 + 'vw); width: ' + this.width + 'vw; height: ' + this.height + 'vh';
    }
  }
}
