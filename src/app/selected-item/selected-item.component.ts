import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { } 

  ngOnInit() {
  }

}
