import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private _http: HttpClient){}

  getProducts(){
    return this._http.get('/api/products');
  }

  filterProducts(tag){
    return this._http.get(`/api/filter/${tag}`);
  }

}