import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/_interface/user';

import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';


@Component({
  selector: 'app-payments-add',
  templateUrl: './payments-add.component.html',
  styleUrls: ['./payments-add.component.scss']
})
export class PaymentsAddComponent implements OnInit {
  users:any;

  form = [
    { label: 'WPŁATA'},
    { label: 'OBCIĄŻENIE'}
  ]

  firstFormGroup: FormGroup = this._formBuilder.group({
    user: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    createdAt: new FormControl('')
  });


  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PaymentsAddComponent>,
    public afs: Firestore,
    public authService: AuthServiceService) { }

  ngOnInit() {
    this.users = this.getUser();
  }

  async getUser() {
    return await this.authService.getUsers();
  }

  selectUser(event: any) {
    this.firstFormGroup.value.user = event.value;
  }

  createPayment() {
    this.firstFormGroup.value.createdAt = new Date;

    this.authService.addPayment(this.firstFormGroup.value).then(() => {
      this.authService.viewMessageSuccess('Pomyślnie dodano nową płatność.');
      this.dialogRef.close();
    }).catch(error => {
      this.authService.viewMessageError('Wystąpił błąd poczas dodawania płatności');
      console.log(error);
    })
  }
}