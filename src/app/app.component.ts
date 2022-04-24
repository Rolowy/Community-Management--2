import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/auth.service';
import {BehaviorSubject} from 'rxjs';

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { ChangepasswordComponent } from './components/user/changepassword/changepassword.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appname:string = environment.title;
  loading = new BehaviorSubject<boolean>(false);
  kropki = '...';

  constructor(private router: Router, public authService: AuthService, private dialog: MatDialog) {
    this.loading.next(false);
    setTimeout(() => { this.loading.next(true)}, 3000); // sztuczny delay do ładowania. przy korzystaniu w nawigacji za szybko chodzi :D
    setInterval(() => { if(this.kropki.length == 3) { this.kropki = '..'} else { this.kropki = '...'}}, 1000)
    }

  changePassword() {
    this.dialog.open(ChangepasswordComponent);
  }
}
