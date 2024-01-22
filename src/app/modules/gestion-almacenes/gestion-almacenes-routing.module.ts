import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AlmacenFormComponent} from "./components/almacen-form/almacen-form.component";
import {AlmacenListComponent} from "./components/almacen-list/almacen-list.component";

const routes: Routes = [

  {
    path: 'configuracion',
    component: AlmacenFormComponent,
  },
  {
    path: '',
    component: AlmacenListComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionAlmacenesRoutingModule { }
