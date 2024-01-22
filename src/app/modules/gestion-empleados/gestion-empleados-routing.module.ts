import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EmpleadoFormComponent} from "./components/empleado-form/empleado-form.component";
import {EmpleadoListComponent} from "./components/empleado-list/empleado-list.component";

const routes: Routes = [

  {
    path: 'configuracion',
    component: EmpleadoFormComponent,
  },
  {
    path: '',
    component: EmpleadoListComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEmpleadosRoutingModule { }
