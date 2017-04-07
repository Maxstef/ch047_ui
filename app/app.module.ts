import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { ModalModule } from 'ng2-bootstrap';
import { BsDropdownModule } from 'ng2-bootstrap';
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {PaymentService} from './services/payment.service';
import {DateService} from './services/date.service';
import {AuthService} from './services/auth.service';
import {CanActivateAdmin} from './services/router-auth-guard-admin';
import {CanActivateCustomer} from './services/router-auth-guard-customer';
import {CalculateService} from './services/calculate.service';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HistoryComponent }  from './history/history.component';
import { CalculateComponent }  from './calculate/calculate.component';
import { TariffComponent }  from './tariff/tariff.component';
import { SetCounterValueComponent }  from './set-counter-value/set-counter-value.component';
import { ChangeTariffComponent }  from './change-tariff/change-tariff.component';
import { LoginComponent }  from './login/login.component';





@NgModule({
  imports:      [ BrowserModule,  HttpModule, FormsModule, ReactiveFormsModule, AppRoutingModule, BsDropdownModule.forRoot(), ModalModule.forRoot() ],
  declarations: [ AppComponent,
                  HistoryComponent,
                  TariffComponent,
                  CalculateComponent,
                  LoginComponent,
                  SetCounterValueComponent,
                  CapitalizePipe,
                  ChangeTariffComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ PaymentService, CalculateService, DateService, AuthService, CanActivateCustomer, CanActivateAdmin ]
})
export class AppModule { }
