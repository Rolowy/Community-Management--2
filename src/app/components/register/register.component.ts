import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { User } from 'src/app/_interface/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    postcode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}[-][0-9]{3}')]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', Validators.pattern('[0-9]{3}[- ][0-9]{3}[- ][0-9]{3}')),
    moderator: new FormControl(true)
  });

  constructor(private fb: FormBuilder,
    public authService: AuthServiceService,
    public router: Router
  ) { }


  ngOnInit() {
    
  }

  save() {
    const userData:User = {
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