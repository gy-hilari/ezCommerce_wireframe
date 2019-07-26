import {
  Component, OnInit, AfterViewInit, Output, Input, ViewChild, ViewChildren,
  ElementRef, QueryList, HostListener
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { FocusTrapFactory, FocusMonitor, ListKeyManager, FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import Speech from 'speak-tts';

@Component({
  selector: 'app-item-navigator',
  templateUrl: './item-navigator.component.html',
  styleUrls: ['../app.component.css']
})
export class ItemNavigatorComponent implements OnInit, AfterViewInit {
  @Output() sendProduct = new EventEmitter();
  @Output() sendTags = new EventEmitter();
  @Output() productFilter = new EventEmitter();
  @Output() sendSpeech = new EventEmitter();
  @Output() sendTab = new EventEmitter();

  @Input() tiles = [];

  @ViewChild('element', { static: true }) element: ElementRef<any>;
  @ViewChildren('elementChild') elementChild: QueryList<any>;

  tileIdx = 0;
  keyManager: any;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute,
    private focusTrap: FocusTrapFactory, private focusMonitor: FocusMonitor) { }

  focus() {
    this.element.nativeElement.focus();
    console.log(this.element.nativeElement);
  }
  ngOnInit() {
    const speech = new Speech(); // will throw an exception if not browser supported
    if (speech.hasBrowserSupport()) { // returns a boolean
      console.log('speech synthesis supported');
    }
    speech.init().then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log('Speech is ready, voices are available', data);
    }).catch(e => {
      console.error('An error occured while initializing : ', e);
    });
  }

  ngAfterViewInit() {
    this.keyManager = new ListKeyManager(this.elementChild);
    this.keyManager.withHorizontalOrientation('ltr'); // Arrow navigation options
    this.keyManager.withWrap(); // Arrow navigation options
  }

     /* Enables keyboard arrows navigation */
    @HostListener('window:keyup', ['$event'])
    keyFunc(event) {
    // let focusTrap = this.focusTrap.create(this.element.nativeElement); // creates a focus trap region
    // focusTrap.focusInitialElement();
    // this.keyManager.setFirstItemActive();
    if (event.code !== 'Tab') {
      console.log('AAAAAAAAAAAAAAAAAAAA');
      this.keyManager.onKeydown(event);
      console.log('BBBBBBBBBBB');

       this.focusMonitor.focusVia(this.keyManager.activeItem, 'keyboard');
      console.log(this.keyManager.activeItem.nativeElement);
    } else {  // 'artificially' updates the active element in case the user uses Tab instead of arrows
      this.keyManager.onKeydown(event);
      this.keyManager.setNextItemActive();
    }
  }

  getProductsFromService() {
    const observable = this._httpService.getProducts();
    observable.subscribe(data => {
      console.log(data);
      this.tiles = data['data'];
    });
  }

  sendItemToParent(product) {
    this.sendProduct.emit(product);
  }
  sendTagsToParent(tags) {
    this.sendTags.emit(tags);
  }

  sendProductFilterToParent(tag) {
    console.log(tag);
    this.productFilter.emit(tag);
  }

  incrementIdx() {
    this.tileIdx += 1;
  }

  decrementIdx() {
    this.tileIdx -= 1;
  }

  speakFeaturedProduct(text) {
    this.sendSpeech.emit(text);
  }

  tabToProduct() {
    this.sendTab.emit();
  }

}
