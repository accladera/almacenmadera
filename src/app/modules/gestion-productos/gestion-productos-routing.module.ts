import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductoFormComponent} from "./components/producto-form/producto-form.component";
import {ProductoListComponent} from "./components/producto-list/producto-list.component";
import {ProductoIncludeComponent} from "./components/producto-include/producto-include.component";

const routes: Routes = [
  {
    path: 'almacen',
    component: ProductoIncludeComponent,
  },
  {
    path: 'configuracion',
    component: ProductoFormComponent,
  },
  {
    path: '',
    component: ProductoListComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionProductosRoutingModule { }
