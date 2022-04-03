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
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
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