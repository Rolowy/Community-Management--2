import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/_interface/user';

import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Payment } from 'src/app/_interface/payment';


@Component({
  selector: 'app-payments-add',
  templateUrl: './payments-add.component.html',
  styleUrls: ['./payments-add.component.scss']
})
export class PaymentsAddComponent implements OnInit {
  users:any;

  amount = new FormControl('', Validators.required)

  form = [
    { label: 'WPŁATA'},
    { label: 'OBCIĄŻENIE'}
  ]

  firstFormGroup: FormGroup = this._formBuilder.group({
    user: new FormControl('', Validators.required),
    amount: this.amount,
    status: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    createdAt: new FormControl('')
  });


  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PaymentsAddComponent>,
    public afs: Firestore,
    public authService: AuthService) { }

  ngOnInit() {
    this.users = this.authService.users;
  }

  selectUser(event: any) {
    this.firstFormGroup.value.user = event.value;
  }

  createPayment() {
    this.firstFormGroup.value.createdAt = new Date;

    this.authService.addPayment(this.firstFormGroup.value as Payment).then(() => {
      this.authService.viewMessageSuccess('Pomyślnie dodano nową płatność.');
      this.dialogRef.close();
    }).catch(error => {
      this.authService.viewMessageError('Wystąpił błąd poczas dodawania płatności');
      console.log(error);
    })
  }
}