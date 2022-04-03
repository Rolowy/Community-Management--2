import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentsComponent } from './components/admin/apartments/apartments.component';
import { RaportsAddComponent } from './components/admin/raports/raports-add/raports-add.component';
import { RaportsComponent } from './components/admin/raports/raports.component';
import { UsersComponent } from './components/admin/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { GuardGuard } from './shared/guard.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'raports', component: RaportsComponent},
  {path: 'addraport', component: RaportsAddComponent},

  {path: 'users', component: UsersComponent},
  {path: 'apartments', component: ApartmentsComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [GuardGuard] },
  {path:'', redirectTo:'/dashboard', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
