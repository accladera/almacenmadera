import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {PageErrorComponent} from './components/page-error/page-error.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertsModule} from "./alerts/alerts.module";
import {ToastrModule} from "ngx-toastr";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import {DialogComponent} from "./components/dialog/dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {ButtonModule} from "@syncfusion/ej2-angular-buttons";
import {NumericTextBoxModule, TextBoxModule} from "@syncfusion/ej2-angular-inputs";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SpinnerComponent,
    PageErrorComponent,
    MenuBarComponent,
    DialogComponent,

  ],
  imports: [
    ToastrModule.forRoot(),
    AlertsModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    ButtonModule,
    NumericTextBoxModule,
    TextBoxModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
