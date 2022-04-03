import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { UserChangepasswordComponent } from './components/user/user-changepassword/user-changepassword.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { AuthServiceService } from './shared/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logged:boolean;
  appname:string = environment.title;

  constructor(public authService: AuthServiceService, private dialog: MatDialog) {
    this.logged = authService.isLoggedIn;
  }

  deleteUserComp() {
    this.dialog.open(UserDeleteComponent);
  }

  changePasswordUserComp() {
    this.dialog.open(UserChangepasswordComponent);
  }


}
