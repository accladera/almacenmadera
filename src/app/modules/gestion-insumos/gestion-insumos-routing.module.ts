import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {InsumoListComponent} from "./components/insumo-list/insumo-list.component";
import {InsumoFormComponent} from "./components/insumo-form/insumo-form.component";

const routes: Routes = [

  {
    path: 'configuracion',
    component: InsumoFormComponent,
  },
  {
    path: '',
    component: InsumoListComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionInsumosRoutingModule { }
