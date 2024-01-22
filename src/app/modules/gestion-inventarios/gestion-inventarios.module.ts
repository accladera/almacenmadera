import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NumericTextBoxModule, TextBoxModule} from "@syncfusion/ej2-angular-inputs";
import {ComboBoxModule, DropDownListModule} from "@syncfusion/ej2-angular-dropdowns";
import {
  AggregateService,
  ContextMenuService, ExcelExportService,
  GridModule,
  PagerModule,
  PageService,
  ResizeService, SearchService,
  ToolbarService
} from "@syncfusion/ej2-angular-grids";
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";
import {MatIconModule} from "@angular/material/icon";
import {DatePickerModule, DateRangePickerModule} from "@syncfusion/ej2-angular-calendars";
import {GestionInventariosRoutingModule} from "./gestion-inventarios-routing.module";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    GestionInventariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    ComboBoxModule,
    NumericTextBoxModule,
    CommonModule,
    GridModule,
    PagerModule,
    ButtonModule,
    MatIconModule,
    DateRangePickerModule,
    DatePickerModule,
    DropDownListModule
  ],
  providers:[
    ContextMenuService,
    PageService,
    ResizeService,
    ToolbarService,
    ExcelExportService,
    SearchService,
    AggregateService,
  ]
})
export class GestionInventariosModule { }
