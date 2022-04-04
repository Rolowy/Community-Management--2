import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lastraport:any;

  constructor(public authService: AuthServiceService) { }

  ngOnInit(): void {
    this.lastraport = this.authService.getUser_LastRaport();
  }

}
