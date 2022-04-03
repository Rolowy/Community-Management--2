import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-user-changepassword',
  templateUrl: './user-changepassword.component.html',
  styleUrls: ['./user-changepassword.component.scss']
})
export class UserChangepasswordComponent implements OnInit {
  hide = true;
  hideold = true;

  form = new FormGroup({
    newpassword: new FormControl('',
      [ Validators.required,
      Validators.minLength(6)]
    ),
    oldpassword: new FormControl('', [Validators.required])
  });

  getErrorMessageOldPassword() {
    if (this.form.controls['oldpassword'].hasError('required')) {
      return '345';
    }  
    return 'Twoje hasło musi mieć przynajmniej 6 znaków.';
  }

  getErrorMessage() {
    if (this.form.controls['newpassword'].hasError('required')) {
      return 'You must enter a value';
    }  
    return 'Twoje hasło musi mieć przynajmniej 6 znaków.';
  }


  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.authService.changePassword(this.form.value.oldPassword, this.form.value.newpassword);
  }

}
