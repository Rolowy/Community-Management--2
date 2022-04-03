import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { NoactivationcodeComponent } from './noactivationcode/noactivationcode.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  visible_password: boolean = true;
  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthServiceService, private router:Router, private dialog: MatDialog) {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.form.value);
  }

  dialogInfo() {
    this.dialog.open(NoactivationcodeComponent);
  }
}
