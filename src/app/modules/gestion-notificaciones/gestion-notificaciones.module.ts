import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  ContextMenuService,
  GridModule,
  PagerModule,
  PageService,
  ResizeService, SearchService,
  ToolbarService
} from "@syncfusion/ej2-angular-grids";
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";
import {MatIconModule} from "@angular/material/icon";
import {GestionNotificacionesRoutingModule} from "./gestion-notificaciones-routing.module";
import {NotificacionListComponent} from "./components/notificacion-list/notificacion-list.component";



@NgModule({
  declarations: [
    NotificacionListComponent,

  ],
  imports: [
    CommonModule,
    GestionNotificacionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GridModule,
    PagerModule,
    ButtonModule,
    MatIconModule,

  ],
  providers:[
    ContextMenuService,
    PageService,
    ResizeService,
    ToolbarService,
    SearchService,
  ]
})
export class GestionNotificacionesModule { }
