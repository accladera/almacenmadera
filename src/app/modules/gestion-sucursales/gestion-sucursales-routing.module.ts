import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SucursalFormComponent} from "./components/sucursal-form/sucursal-form.component";
import {SucursalListComponent} from "./components/sucursal-list/sucursal-list.component";

const routes: Routes = [

  {
    path: 'configuracion',
    component: SucursalFormComponent,
  },
  {
    path: '',
    component: SucursalListComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionSucursalesRoutingModule { }
