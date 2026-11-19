/*
* ionic-pullup v2 for Ionic/Angular 2
*/

import { ChangeDetectionStrategy,
  Component,
  EventEmitter,
  ElementRef,
  Renderer,
  ViewChild,
  ContentChild,
  Output,
  Input
} from '@angular/core';
import { Tabs, Toolbar, Gesture, Platform } from 'ionic-angular';

export interface Footer {
  height: number;
  posY: number;
  lastPosY: number;
  defaultHeight?: number;
}

export interface View {
  header?: Element;
  headerHeight?: number;
}

// trạng thái mở rộng (Collapsed), đóng (Expanded), thu nhỏ (Minimized)
export enum IonPullUpFooterState {
  Collapsed = 0,
  Expanded = 1,
  Minimized = 2
}

// hướng di chuyển lên (Up), xuống (Down)
export enum IonPullUpFooterDirection {
  Up,
  Down
}

@Component({
  selector: 'ion-pullup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-footer #footer>
      <ng-content></ng-content>
    </ion-footer>
  `
})
export class IonPullUpComponent {
  // trạng thái hiện tại
  @Input() state: IonPullUpFooterState;
  @Output() stateChange: EventEmitter<IonPullUpFooterState> = new EventEmitter<IonPullUpFooterState>();

  _oldState: IonPullUpFooterState;

  // chiều cao giới hạn cho phép ở trạng thái Minimized
  @Input() maxHeight: number;

  // thanh Toolbar và Footer
  @ContentChild(Toolbar) childToolbar;
  @ViewChild('footer') childFooter;

  @ContentChild(Tabs) childTabs;

  mapElastic: any;
  tabFixScroll: any;

  _footer: Footer;
  _currentView: View;
  _direction: IonPullUpFooterDirection;

  constructor(private platform: Platform,
    private el: ElementRef,
    private renderer: Renderer
  ) {
    this._footer = {
      height: 0,
      posY: 0,
      lastPosY: 0
    };
    this._currentView = {};
  }

  ngOnInit() {
    this.mapElastic = document.getElementById('map-elastic');
    this.mapElastic.style.webkitTransformOrigin = 'center bottom';

    this.tabFixScroll = this.el.nativeElement.querySelectorAll('.fix-scroll');

    window.addEventListener('orientationchange', () => {
      this.updateUI();
    });

    window.addEventListener('resize', () => {
      this.updateUI();
    });

    this.platform.resume.subscribe(() => {
      this.updateUI();
    });
  }

  ngAfterContentInit() {
    this.computeDefaults();

    let barGesture = new Gesture(this.childToolbar._elementRef.nativeElement);
    barGesture.listen();

    barGesture.on('pan panstart panend', event => {
      this.onDrag(event);
    });

    this.state = this.state || IonPullUpFooterState.Minimized;

    this.updateUI();
  }

  computeDefaults() {
    this._footer.defaultHeight = this.childFooter.nativeElement.offsetHeight;
    this._currentView.header = document.querySelector('ion-navbar.toolbar');
    this._currentView.headerHeight = this._currentView.header ? (<HTMLElement>this._currentView.header).offsetHeight : 0;
  }

  // dùng get để trả về property thay vì method
  get expandedHeight() {
    return window.innerHeight - this._currentView.headerHeight;
  }

  computeHeights() {
    this._footer.height = this.expandedHeight;

    this.maxHeight = this.maxHeight || Math.round(this._footer.height / 2);
    this.renderer.setElementStyle(this.childFooter.nativeElement, 'height', this._footer.height + 'px');
  }

  updateUI() {
    this.computeHeights();
    this.updateFixScroll();
    this.switchState();
    this.renderer.setElementStyle(this.childFooter.nativeElement, 'transition', 'none');
  }

  updateFixScroll() {
    let marginBottom = 0;

    if (this.state == IonPullUpFooterState.Minimized) marginBottom = Math.round((window.innerHeight - this._footer.defaultHeight) / 2) + this._currentView.headerHeight;
    else if (this.state == IonPullUpFooterState.Expanded) marginBottom = this._currentView.headerHeight;

    this.tabFixScroll.forEach(element => {
      element.style.marginBottom = marginBottom + 'px';
    });
  }

  switchState() {
    switch (this.state) {
      case IonPullUpFooterState.Collapsed:
        this.collapse();
        break;
      case IonPullUpFooterState.Expanded:
        this.expand();
        break;
      case IonPullUpFooterState.Minimized:
        this.minimize();
        break;
    }
  }

  expand() {
    let translateAmt = (this._footer.height - this._footer.defaultHeight) / 2;
    this.mapElastic.style.webkitTransform = 'translate3d(0, ' + translateAmt + 'px, 0) scale(1, 1)';

    this._footer.lastPosY = 0;

    this.renderer.setElementStyle(this.childFooter.nativeElement, '-webkit-transform', 'translate3d(0, 0, 0)');
    this.renderer.setElementStyle(this.childFooter.nativeElement, 'transform', 'translate3d(0, 0, 0)');
    this.renderer.setElementStyle(this.childFooter.nativeElement, 'transition', '300ms ease-in-out');

  }

  collapse() {
    this.mapElastic.style.webkitTransform = 'translate3d(0, 0, 0) scale(1, 1)';

    this._footer.lastPosY = this._footer.height - this._footer.defaultHeight;

    this.renderer.setElementStyle(this.childFooter.nativeElement, '-webkit-transform', 'translate3d(0, ' + this._footer.lastPosY + 'px, 0)');
    this.renderer.setElementStyle(this.childFooter.nativeElement, 'transform', 'translate3d(0, ' + this._footer.lastPosY + 'px, 0)');

  }

  minimize() {
    let translateAmt = (this.maxHeight - (this._footer.height - this._footer.defaultHeight)) / 2;
    this.mapElastic.style.webkitTransform = 'translate3d(0, ' + translateAmt + 'px, 0) scale(1, 1)';

    this._footer.lastPosY = this.maxHeight;

    this.renderer.setElementStyle(this.childFooter.nativeElement, '-webkit-transform', 'translate3d(0, ' + this._footer.lastPosY + 'px, 0)');
    this.renderer.setElementStyle(this.childFooter.nativeElement, 'transform', 'translate3d(0, ' + this._footer.lastPosY + 'px, 0)');

  }

  onDrag(event: any) {
    event.preventDefault();

    switch (event.type) {
      case 'panstart':
        this.renderer.setElementStyle(this.childFooter.nativeElement, 'transition', 'none');
        break;
      case 'pan':
        let translateAmt, scrollTop = Math.round(event.deltaY);

        this._footer.posY = scrollTop + this._footer.lastPosY;

        if (this._footer.posY < 0 || this._footer.posY > (this._footer.height - this._currentView.headerHeight)) return;

        this.renderer.setElementStyle(this.childFooter.nativeElement, '-webkit-transform', 'translate3d(0, ' + this._footer.posY + 'px, 0)');
        this.renderer.setElementStyle(this.childFooter.nativeElement, 'transform', 'translate3d(0, ' + this._footer.posY + 'px, 0)');

        if (this.state == IonPullUpFooterState.Minimized) {
          translateAmt = (scrollTop - this.maxHeight) / 2;
        }
        else if (scrollTop <= 0) {
          translateAmt = scrollTop / 2;
        } else {
          translateAmt = (scrollTop - (this._footer.height - this._footer.defaultHeight)) / 2;
        }

        this.mapElastic.style.webkitTransform = 'translate3d(0,' + translateAmt + 'px,0) scale(1, 1)';
        break;
      case 'panend':
        this.renderer.setElementStyle(this.childFooter.nativeElement, 'transition', '300ms ease-in-out');

        if (this._footer.lastPosY > this._footer.posY) this._direction = IonPullUpFooterDirection.Up;
        else if (this._footer.lastPosY < this._footer.posY) this._direction = IonPullUpFooterDirection.Down;

        if (this.state == IonPullUpFooterState.Minimized) {
          // nếu ở trạng thái Minimized và di chuyển lên
          if (this._direction == IonPullUpFooterDirection.Up) this.state = IonPullUpFooterState.Expanded;
          // nếu ở trạng thái Minimized và di chuyển xuống
          else if (this._direction == IonPullUpFooterDirection.Down) this.state = IonPullUpFooterState.Collapsed;
        }
        else if (this.state == IonPullUpFooterState.Expanded) {
          if (this._direction == IonPullUpFooterDirection.Down) {
            // nếu ở trạng thái Expanded, di chuyển xuống và nhỏ hơn chiều cao giới hạn
            if (this._footer.posY < this.maxHeight) this.state = IonPullUpFooterState.Minimized;
            // nếu ở trạng thái Expanded, di chuyển xuống và lớn hơn chiều cao giới hạn
            else this.state = IonPullUpFooterState.Collapsed;
          }
        }
        else if (this.state == IonPullUpFooterState.Collapsed) {
          if (this._direction == IonPullUpFooterDirection.Up) {
            // nếu ở trạng thái Collapsed, di chuyển lên và lớn hơn chiều cao giới hạn
            if (this._footer.posY > this.maxHeight) this.state = IonPullUpFooterState.Minimized;
            // nếu ở trạng thái Collapsed, di chuyển lên và nhỏ hơn chiều cao giới hạn
            else this.state = IonPullUpFooterState.Expanded;
          }
        }
        break;
    }
  }

  ngDoCheck() {
    if (!Object.is(this.state, this._oldState)) {
      this.switchState();

      if (this.tabFixScroll) this.updateFixScroll();

      this._oldState = this.state;

      window.setTimeout(() => {
        this.stateChange.emit(this.state);
      });
    }
  }
}
