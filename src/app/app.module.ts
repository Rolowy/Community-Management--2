import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { AuthServiceService } from './shared/auth-service.service';

import { MaterialModule } from './material/material.module';
import { NgzorroModule } from './material/ngzorro.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { NoactivationcodeComponent } from './components/login/noactivationcode/noactivationcode.component';
import { UserChangepasswordComponent } from './components/user/user-changepassword/user-changepassword.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ApartmentsComponent } from './components/admin/apartments/apartments.component';
import { UsersEditComponent } from './components/admin/users/users-edit/users-edit.component';
import { UsersDeleteComponent } from './components/admin/users/users-delete/users-delete.component';
import { UsersAddComponent } from './components/admin/users/users-add/users-add.component';
import { ApartmentsAddComponent } from './components/admin/apartments/apartments-add/apartments-add.component';
import { ApartmentsDeleteComponent } from './components/admin/apartments/apartments-delete/apartments-delete.component';
import { ApartmentsEditComponent } from './components/admin/apartments/apartments-edit/apartments-edit.component';
import { RaportsComponent } from './components/admin/raports/raports.component';
import { RaportsAddComponent } from './components/admin/raports/raports-add/raports-add.component';
import { RaportsDeleteComponent } from './components/admin/raports/raports-delete/raports-delete.component';
import { ChatComponent } from './components/chat/chat.component';
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

registerLocaleData(pl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    RegisterComponent,
    UserDeleteComponent,
    NoactivationcodeComponent,
    UserChangepasswordComponent,
    UsersComponent,
    ApartmentsComponent,
    UsersEditComponent,
    UsersDeleteComponent,
    UsersAddComponent,
    ApartmentsAddComponent,
    ApartmentsDeleteComponent,
    ApartmentsEditComponent,
    RaportsComponent,
    RaportsAddComponent,
    RaportsDeleteComponent,
    ChatComponent,
    UserRaportsComponent,
    PaymentsComponent,
    PaymentsAddComponent,
    PaymentsEditComponent,
    PaymentsDeleteComponent
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
  ],
  exports: [
  ],
  providers: [AuthServiceService, { provide: NZ_I18N, useValue: pl_PL }],
  bootstrap: [AppComponent]
})
export class AppModule { }
