import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {InventarioFormComponent} from "./components/inventario-form/inventario-form.component";
import {InventarioListComponent} from "./components/inventario-list/inventario-list.component";

const routes: Routes = [

  {
    path: 'configuracion',
    component: InventarioFormComponent,
  },
  {
    path: '',
    component: InventarioListComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionInventariosRoutingModule { }
