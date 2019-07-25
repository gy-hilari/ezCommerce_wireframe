import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { HttpService } from '../http.service';


@Component({
  selector: 'app-selected-item',
  templateUrl: './selected-item.component.html',
  styleUrls: ['../app.component.css']
})
export class SelectedItemComponent implements OnInit {
  @Input() productId;
  @Input() targetProduct;

  @Output() productToCart = new EventEmitter();
  @Output() productFilter = new EventEmitter();


  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { } 

  ngOnInit() {
  }

  addProductToCart(){
    console.log("in addProductToCart()")
    this.productToCart.emit(this.targetProduct);
  }
  
  sendProductFilterToParent(tag){
    console.log(tag);
    this.productFilter.emit(tag);
  }

}
