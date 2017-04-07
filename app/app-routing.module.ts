import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import {CanActivateAdmin} from './services/router-auth-guard-admin';
import {CanActivateCustomer} from './services/router-auth-guard-customer';
import { HistoryComponent }  from './history/history.component';
import { CalculateComponent }  from './calculate/calculate.component';
import { TariffComponent }  from './tariff/tariff.component';
import { SetCounterValueComponent }  from './set-counter-value/set-counter-value.component';
import { ChangeTariffComponent }  from './change-tariff/change-tariff.component';
import { LoginComponent }  from './login/login.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: 'history', component: HistoryComponent, canActivate: [CanActivateCustomer ]},
  { path: 'tariff-calculate', component: CalculateComponent, canActivate: [CanActivateCustomer]},
  { path: 'set-value', component: SetCounterValueComponent, canActivate: [ CanActivateCustomer]},
  { path: 'change-tariff', component: ChangeTariffComponent, canActivate: [CanActivateAdmin]},
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}