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
    RaportsAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
  ],
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
