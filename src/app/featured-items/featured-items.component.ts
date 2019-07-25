import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { HttpService } from '../http.service';


@Component({
  selector: 'app-featured-items',
  templateUrl: './featured-items.component.html',
  styleUrls: ['../app.component.css']
})
export class FeaturedItemsComponent implements OnInit {

  @Input() featuredItems;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { } 

  ngOnInit() {
  }

}
