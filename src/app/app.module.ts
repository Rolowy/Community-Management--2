import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NgxMaskModule } from 'ngx-mask';
import { AuthService } from './shared/auth.service';

import { MaterialModule } from './material/material.module';
import { NgzorroModule } from './material/ngzorro.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/admin/users/users.component';
import { UsersEditComponent } from './components/admin/users/users-edit/users-edit.component';
import { UsersDeleteComponent } from './components/admin/users/users-delete/users-delete.component';
import { UsersAddComponent } from './components/admin/users/users-add/users-add.component';
import { RaportsComponent } from './components/admin/raports/raports.component';
import { RaportsAddComponent } from './components/admin/raports/raports-add/raports-add.component';
import { RaportsDeleteComponent } from './components/admin/raports/raports-delete/raports-delete.component';
import { UserRaportsComponent } from './components/user/user-raports/user-raports.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pl_PL } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pl from '@angular/common/locales/pl';
import { HttpClientModule } from '@angular/common/http';
import { PaymentsComponent } from './components/admin/payments/payments.component';
import { PaymentsAddComponent } from './components/admin/payments/payments-add/payments-add.component';
import { PaymentsEditComponent } from './components/admin/payments/payments-edit/payments-edit.component';
import { PaymentsDeleteComponent } from './components/admin/payments/payments-delete/payments-delete.component';
import { UserRaportsViewComponent } from './components/user/user-raports-view/user-raports-view.component';
import { ChangepasswordComponent } from './components/user/changepassword/changepassword.component';
import { InputComponent } from './components/functions/input/input.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { Input2Component } from './components/functions/input2/input2.component';
import { PremisesComponent } from './components/admin/premises/premises.component';
import { PremisesAddComponent } from './components/admin/premises/premises-add/premises-add.component';
import { PremisesDeleteComponent } from './components/admin/premises/premises-delete/premises-delete.component';
import { PremisesEditComponent } from './components/admin/premises/premises-edit/premises-edit.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AdvertComponent } from './components/advert/advert.component';
import { AdvertAddComponent } from './components/advert/advert-add/advert-add.component';
import { AdvertViewComponent } from './components/advert/advert-view/advert-view.component';

registerLocaleData(pl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    UsersComponent,
    UsersEditComponent,
    UsersDeleteComponent,
    UsersAddComponent,
    RaportsComponent,
    RaportsAddComponent,
    RaportsDeleteComponent,
    UserRaportsComponent,
    PaymentsComponent,
    PaymentsAddComponent,
    PaymentsEditComponent,
    PaymentsDeleteComponent,
    UserRaportsViewComponent,
    ChangepasswordComponent,
    InputComponent,
    Input2Component,
    PremisesComponent,
    PremisesAddComponent,
    PremisesDeleteComponent,
    PremisesEditComponent,
    AdvertComponent,
    AdvertAddComponent,
    AdvertViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgzorroModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
    NgxMaskModule.forRoot(),
    CurrencyMaskModule
  ],
  exports: [
  ],
  providers: [AuthService, { provide: NZ_I18N, useValue: pl_PL }],
  bootstrap: [AppComponent]
})
export class AppModule { }
