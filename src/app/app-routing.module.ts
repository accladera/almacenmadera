import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {PageErrorComponent} from "./components/page-error/page-error.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'error',
    component: PageErrorComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./modules/gestion-productos/gestion-productos.module').then(
        (m) => m.GestionProductosModule
      ),
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
  {
    path: 'materiales',
    loadChildren: () =>
      import('./modules/gestion-materiales/gestion-materiales.module').then(
        (m) => m.GestionMaterialesModule
      ),
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
  {
    path: 'insumos',
    loadChildren: () =>
      import('./modules/gestion-insumos/gestion-insumos.module').then(
        (m) => m.GestionInsumosModule
      ),
  },

  {
    path: 'sucursales',
    loadChildren: () =>
      import('./modules/gestion-sucursales/gestion-sucursales.module').then(
        (m) => m.GestionSucursalesModule
      ),
  },
  {
    path: 'almacenes',
    loadChildren: () =>
      import('./modules/gestion-almacenes/gestion-almacenes.module').then(
        (m) => m.GestionAlmacenesModule
      ),
  },
  {
    path: 'empleados',
    loadChildren: () =>
      import('./modules/gestion-empleados/gestion-empleados.module').then(
        (m) => m.GestionEmpleadosModule
      ),
  },
  {
    path: 'inventarios',
    loadChildren: () =>
      import('./modules/gestion-inventarios/gestion-inventarios.module').then(
        (m) => m.GestionInventariosModule
      ),
  },
  {
    path: 'configuraciones',
    loadChildren: () =>
      import('./modules/gestion-parametricas/gestion-parametricas.module').then(
        (m) => m.GestionParametricasModule
      ),
  },
  {
    path: 'notificaciones',
    loadChildren: () =>
      import('./modules/gestion-notificaciones/gestion-notificaciones.module').then(
        (m) => m.GestionNotificacionesModule
      ),
  },
  {
    path: 'finanzas',
    loadChildren: () =>
      import('./modules/finanzas-personales/finanzas-personales.module').then(
        (m) => m.FinanzasPersonalesModule
      ),
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
