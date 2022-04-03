import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../shared/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logged:boolean;
  appname:string = environment.title;

  constructor(public authService: AuthServiceService) {
    this.logged = authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

}
