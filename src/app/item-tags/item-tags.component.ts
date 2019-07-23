import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { HttpService } from '../http.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-item-tags',
  templateUrl: './item-tags.component.html',
  styleUrls: ['../app.component.css']
})
export class ItemTagsComponent implements OnInit {
  @Input() productCategory;
  @Output() productFilter = new EventEmitter;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { } 

  ngOnInit() {
  }

  sendProductFilterToParent(tag){
    console.log(tag);
    this.productFilter.emit(tag);
  }

}
