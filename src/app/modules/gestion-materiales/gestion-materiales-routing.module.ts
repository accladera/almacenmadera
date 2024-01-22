import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MaterialCFormComponent} from "./components/material-cform/material-cform.component";
import {MaterialCListComponent} from "./components/material-clist/material-clist.component";

const routes: Routes = [

  {
    path: 'configuracion',
    component: MaterialCFormComponent,
  },
  {
    path: '',
    component: MaterialCListComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionMaterialesRoutingModule { }
