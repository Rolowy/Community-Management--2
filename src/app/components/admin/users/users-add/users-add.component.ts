import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_interface/user';
import { MatDialogRef } from '@angular/material/dialog';
import { Email } from 'src/app/validator/email';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
})
export class UsersAddComponent implements OnInit {
  visible_password = true;

  bankaccount = new FormControl('', [Validators.required, Validators.minLength(26)])
  postcode = new FormControl('', [Validators.required])
  phone = new FormControl('')

  firstFormGroup: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email], this.emailTaken.validate),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  secondFormGroup: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    postcode: this.postcode,
    bankaccount: this.bankaccount,
    phone: this.phone,
    city: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  threeFormGroup: FormGroup = this.fb.group({
    moderator: [false, Validators.required]
  });

  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<UsersAddComponent>,
    private authService: AuthService,
    public emailTaken: Email) { }

  ngOnInit() {
  }

  async createUser() {
    const userData: User = {
      email: this.firstFormGroup.value.email,
      password: this.firstFormGroup.value.password,
      name: this.secondFormGroup.value.name,
      lastname: this.secondFormGroup.value.lastname,
      address: this.secondFormGroup.value.address,
      postcode: this.secondFormGroup.value.postcode,
      bankaccount: this.secondFormGroup.value.bankaccount,
      city: this.secondFormGroup.value.city,
      phone: this.secondFormGroup.value.phone,
      moderator: this.threeFormGroup.value.moderator
    };
    this.authService.register(userData);
    this.dialogRef.close();
  }
}