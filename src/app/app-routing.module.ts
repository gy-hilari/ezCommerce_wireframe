import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturedItemsComponent } from './featured-items/featured-items.component';
import { SelectedItemComponent } from './selected-item/selected-item.component';



const routes: Routes = [
  // { path: 'featureItems', component: FeaturedItemsComponent},
  // { path: 'productTile', component: SelectedItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
