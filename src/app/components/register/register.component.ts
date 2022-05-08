import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/_interface/user';
import { Email } from 'src/app/validator/email';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  phone = new FormControl('', Validators.required);
  postcode = new FormControl('', Validators.required);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email], this.emailTaken.validate),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    postcode: this.postcode,
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: this.phone,
    moderator: new FormControl(true)
  });

  constructor(private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public emailTaken: Email
  ) { }


  ngOnInit() {

  }

  save() {
    const userData: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      address: this.form.value.address,
      postcode: this.form.value.postcode,
      city: this.form.value.city,
      phone: this.form.value.phone,
      moderator: true,
    }

    this.authService.register(userData);
  }
}