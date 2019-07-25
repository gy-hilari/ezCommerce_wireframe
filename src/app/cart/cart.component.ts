import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { HttpService } from '../http.service';
import Speech from 'speak-tts';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../app.component.css']
})
export class CartComponent implements OnInit {

  @Input() cart;
  @Output() clearCart = new EventEmitter();

  @Output() sendSpeech = new EventEmitter();

  speech = new Speech();

  cartKeys = [];

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { } 

  ngOnInit() {

    this.cartKeys = Object.keys(this.cart);

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

  // cartKeys(): Array<string> {
  //   return Object.keys(this.cart);
  // }

  speakCart(){
    if(this.cartKeys.length > 0){
      this.sendSpeech.emit("Items in cart: ");
      // this.speech.speak({
      //   text: `Items in cart: `,
      // }).then(() => {
      //   console.log("Success !")
      // }).catch(e => {
      //   console.error("An error occurred :", e)
      // })
      for(var key in this.cart){
        this.sendSpeech.emit(`${key}, quantity, ${this.cart[key]['quantity']}`);
        // this.speech.speak({
        //   text: `${key}, quantity, ${this.cart[key]['quantity']}`,
        // }).then(() => {
        //   console.log("Success !")
        // }).catch(e => {
        //   console.error("An error occurred :", e)
        // })
      }
    }
  }

  checkout(){
    for(var key in this.cart){
      let observable = this._httpService.updatePopularity({
        id: this.cart[key]['id'],
        increment: this.cart[key]['quantity']
      });
      observable.subscribe(data =>{
        console.log("Updated Product Popularity: ", data);
      });
    }
    this.cartKeys = [];
    this.clearCart.emit();
  }
  
  clearCartItems(){
    this.cartKeys = [];
    this.clearCart.emit();
  }

}
