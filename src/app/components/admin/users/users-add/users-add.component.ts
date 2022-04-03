import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_interface/user'; 
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class UsersAddComponent implements OnInit {

  firstFormGroup: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: ['', Validators.required]
  })

  secondFormGroup:FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    address: ['', Validators.required],
    postcode: ['', Validators.required],
    bankaccount: new FormControl('', [Validators.required, Validators.pattern("[0-9]{2}[ ][0-9]{4}[ ][0-9]{4}[ ][0-9]{4}[ ][0-9]{4}[ ][0-9]{4}[ ][0-9]{4}")]),
    phone: ['', Validators.minLength(9)],
    city: ['', Validators.required]
  });

  threeFormGroup:FormGroup = this.fb.group({
    moderator: ['', Validators.required]
  });


  constructor(public fb: FormBuilder,
    private authService: AuthServiceService) { }


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

    await this.authService.register(userData);
  }
}