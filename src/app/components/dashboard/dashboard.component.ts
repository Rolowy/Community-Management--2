import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { Raports } from 'src/app/_interface/raport';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  advert:boolean = false;

  lastraport:any;
  lastpayments:any;
  lastburden:any;
  premises:any

  test:any

  constructor(public authService: AuthServiceService, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.authService.obliczanieObciazenia();

    this.lastraport = this.authService.getUser_LastRaport();
    this.lastpayments = this.authService.getUser_LastPayment();
    this.lastburden = this.authService.getUser_LastBurden();
    this.premises = this.authService.getUser_Premises();

    if(this.authService.isLoggedIn)
      if(this.authService.userMod == false && this.advert == false)
      {
        this.notification.info('Rachunek', 'Każdy mieszkaniec ma swój indywidualny numer rachunku.', {
          nzPlacement: 'bottomRight',
        });
        this.advert = true;
      }
  }
}
