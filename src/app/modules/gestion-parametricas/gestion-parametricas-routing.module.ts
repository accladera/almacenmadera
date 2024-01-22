import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ParametricaFormComponent} from "./components/parametrica-form/parametrica-form.component";
import {ParametricaListComponent} from "./components/parametrica-list/parametrica-list.component";

const routes: Routes = [

  {
    path: 'configuracion',
    component: ParametricaFormComponent,
  },
  {
    path: '',
    component: ParametricaListComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionParametricasRoutingModule { }
