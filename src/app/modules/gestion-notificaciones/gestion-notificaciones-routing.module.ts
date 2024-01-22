import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotificacionListComponent} from "./components/notificacion-list/notificacion-list.component";

const routes: Routes = [

  {
    path: '',
    component: NotificacionListComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionNotificacionesRoutingModule { }
