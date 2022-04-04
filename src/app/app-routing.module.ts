import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentsComponent } from './components/admin/apartments/apartments.component';
import { RaportsAddComponent } from './components/admin/raports/raports-add/raports-add.component';
import { RaportsComponent } from './components/admin/raports/raports.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ChatComponent } from './components/chat/chat.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserRaportsComponent } from './components/user/user-raports/user-raports.component';

import { GuardGuard } from './shared/guard.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'raports', component: RaportsComponent, canActivate: [GuardGuard] },
  {path: 'addraport', component: RaportsAddComponent, canActivate: [GuardGuard] },
  {path: 'chat', component: ChatComponent, canActivate: [GuardGuard] },

  {path: 'user/raports', component: UserRaportsComponent, canActivate: [GuardGuard] },
  {path: 'users', component: UsersComponent, canActivate: [GuardGuard] },
  {path: 'apartments', component: ApartmentsComponent, canActivate: [GuardGuard] },
  {path: 'dashboard', component: DashboardComponent, canActivate: [GuardGuard] },
  {path:'', redirectTo:'/dashboard', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
