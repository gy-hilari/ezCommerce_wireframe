import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { HttpService } from '../http.service';


@Component({
  selector: 'app-featured-items',
  templateUrl: './featured-items.component.html',
  styleUrls: ['../app.component.css']
})
export class FeaturedItemsComponent implements OnInit {
  @Output() sendProduct = new EventEmitter();
  @Input() featuredItems;


  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { } 

  ngOnInit() {
  }

  sendItemToParent(product) {
    this.sendProduct.emit(product);
  }

}
