import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { HttpService } from './http.service';
import Speech from 'speak-tts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @HostListener('window:keydown.backspace') backspaceEvent() {
    this.getProductsFromService();
  }

  @HostListener('window:keydown.shift.p') speakProductEvent() {
    if( this.targetProduct != null){
      this.speakProduct();
    }
  }

  title = 'Accessible Commerce';

  displayModes = {
    featured: "featured",
    selected: "selected",
    cart: "cart"
  };

  displayMode = this.displayModes['featured'];

  productId = 0;
  targetProduct = {};
  productTags = [];

  productFilter = "";
  allProducts = [];

  tileGroups = [];

  speech = new Speech();

  cart = {};

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getProductsFromService();
    this.speech.init({
      'volume': 1,
      'lang': 'en-GB',
      'rate': 1,
      'pitch': 1,
      'voice': 'Google UK English Male',
      'splitSentences': true,
      'listeners': {
        'onvoiceschanged': (voices) => {
          console.log("Event voiceschanged", voices)
        }
      }
    }).then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log("Speech is ready, voices are available", data)
    }).catch(e => {
      console.error("An error occured while initializing : ", e)
    })
  }

  featureMode() {
    this.displayMode = this.displayModes['featured'];
    console.log(this.displayMode);
    console.log("Main panel set to Feature Mode");
  }
  
  productMode(event) {
    // this._router.navigate(['/productTile']);
    this.displayMode = this.displayModes['selected'];
    this.targetProduct = event;
    console.log("Got item#: ", event);
  }
  
  cartMode(){
    this.displayMode = this.displayModes['cart'];
    console.log(this.displayMode);
  }

  setProductTags(event) {
    // this.productTags = event;this.displayMode = this.displayMode['featured'];
    console.log("Got tags: ", event);
  }

  filterProducts(event) {
    this.productFilter = event;
    this.tileGroups = [];

    let observable = this._httpService.filterProducts(event);
    observable.subscribe(data => {
      console.log("Got filtered items: ", data);
      this.allProducts = data['data'];
      this.groupProducts(this.allProducts);
    });
  }

  getProductsFromService() {
    this.tileGroups = [];
    this.displayMode = this.displayModes['featured'];
    let observable = this._httpService.getProducts();
    observable.subscribe(data => {
      console.log(data);
      this.allProducts = data['data'];
      this.groupProducts(this.allProducts);
    });
  }

  groupProducts(arr) {
    var start = 0;
    var end = 8;

    var newTileGroup = [];

    console.log(arr[end]);

    if (arr.length >= end) {
      for (var i = start; i < end; i++) {
        if (arr[i] != undefined) {
          console.log(i);
          newTileGroup.push(arr[i]);
        }
        if ((i + 1) == end && arr[end] != undefined) {
          this.tileGroups.push(newTileGroup);
          start = end - 1;
          console.log(start);
          end += 8;
          i = start;
          console.log(i);
          newTileGroup = [];
        }
      }

      this.tileGroups.push(newTileGroup);
      // add a bonus "go back" tile group
      console.log("Grouped tiles: ", this.tileGroups);
    }
    else {

      for (var i = 0; i < arr.length; i++) {
        newTileGroup.push(arr[i]);
      }
      this.tileGroups.push(newTileGroup);
      newTileGroup = [];
      console.log("Grouped tiles: ", this.tileGroups);
    }

  }

  addToCart(event){
    if(this.cart[event['title']] >= 1){
      this.cart[event['title']] += 1;
    }
    else{
      this.cart[event['title']] = 1;
    }
    console.log(this.cart);
  }

  speakProduct(){
    this.speech.speak({
      text: `The product ${this.targetProduct['title']} costs ${this.targetProduct['price']} dollars and is in the ${this.targetProduct['category']} category,
      description: ${this.targetProduct['description']}`,
    }).then(() => {
      console.log("Success !")
    }).catch(e => {
      console.error("An error occurred :", e)
    })
  }


}
