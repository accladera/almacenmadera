import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccountComponent} from "./components/account/account.component";
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {CategoryComponent} from "./components/category/category.component";


const routes: Routes = [

  {
    path: 'cuenta',
    component: AccountComponent,
  },
  {
    path: 'movimiento',
    component: TransactionsComponent,
  },
  {
    path: 'categorias',
    component: CategoryComponent,
  },



]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanzasPersonalesRoutingModule { }
