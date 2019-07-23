import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-item-navigator',
  templateUrl: './item-navigator.component.html',
  styleUrls: ['../app.component.css']
})
export class ItemNavigatorComponent implements OnInit {
  @Output() sendProduct = new EventEmitter();
  @Output() sendTags = new EventEmitter();

  @Input() tiles = [];
  // tileGroups = [];

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { } 

  ngOnInit() {
    // this.getProductsFromService();
  }

  getProductsFromService(){
    let observable = this._httpService.getProducts();
    observable.subscribe(data => {
      console.log(data);
      this.tiles = data['data'];
    });
  }

  sendItemToParent(product) {
    this.sendProduct.emit(product);
  }
  sendTagsToParent(tags){
    this.sendTags.emit(tags);
  }

}
