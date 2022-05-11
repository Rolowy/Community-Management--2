import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './components/admin/payments/payments.component';
import { RaportsAddComponent } from './components/admin/raports/raports-add/raports-add.component';
import { RaportsComponent } from './components/admin/raports/raports.component';
import { UsersComponent } from './components/admin/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PremisesComponent } from './components/admin/premises/premises.component';
import { RegisterComponent } from './components/register/register.component';
import { UserRaportsViewComponent } from './components/user/user-raports-view/user-raports-view.component';
import { UserRaportsComponent } from './components/user/user-raports/user-raports.component';

import { GuardGuard } from './shared/guard.guard';
import { ModeratorGuard } from './shared/moderator.guard';
import { AdvertComponent } from './components/advert/advert.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, //W przypadku wykonania pierwszej rejestracji dopisujemy dwa slesze przed początkiem nawiasu w tym wierszu
//  { path: 'register', component: RegisterComponent } O to przykład
  { path: 'raports', component: RaportsComponent, canActivate: [GuardGuard, ModeratorGuard] },
  { path: 'addraport', component: RaportsAddComponent, canActivate: [GuardGuard, ModeratorGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [GuardGuard, ModeratorGuard] },
  { path: 'user/raports', component: UserRaportsComponent, canActivate: [GuardGuard] },
  { path: 'user/raports/:id', component: UserRaportsViewComponent, canActivate: [GuardGuard] },
  { path: 'users', component: UsersComponent, canActivate: [GuardGuard, ModeratorGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardGuard] },
  { path: 'advert', component: AdvertComponent, canActivate: [GuardGuard] },
  { path: 'premises', component: PremisesComponent, canActivate: [GuardGuard, ModeratorGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
