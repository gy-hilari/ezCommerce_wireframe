import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';

import { FormsModule } from '@angular/forms';

import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { FeaturedItemsComponent } from './featured-items/featured-items.component';
import { SelectedItemComponent } from './selected-item/selected-item.component';
import { ItemTagsComponent } from './item-tags/item-tags.component';
import { ItemNavigatorComponent } from './item-navigator/item-navigator.component';


@NgModule({
  declarations: [
    AppComponent,
    FeaturedItemsComponent,
    SelectedItemComponent,
    ItemTagsComponent,
    ItemNavigatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2CarouselamosModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
