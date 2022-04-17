
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_interface/user';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from 'src/app/_interface/payment';
import { collection, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-payments-edit',
  templateUrl: './payments-edit.component.html',
  styleUrls: ['./payments-edit.component.scss']
})
export class PaymentsEditComponent implements OnInit {
  users:any;

  form = [
    { label: 'WPŁATA'},
    { label: 'OBCIĄŻENIE'}
  ]

  firstFormGroup: FormGroup = this.fb.group({
    user: new FormControl(this.data.user.uid, Validators.required),
    amount: new FormControl(this.data.amount, Validators.required),
    status: new FormControl(this.data.status, Validators.required),
    date: new FormControl(new Date(this.data.date.seconds*1000), Validators.required)
  });


  constructor(
  public dialogRef: MatDialogRef<PaymentsEditComponent>,
    private fb: FormBuilder,
    private afs: Firestore,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:Payment,
  ) {}

  ngOnInit() {
    this.users = this.authService.getUsers();
  }

  selectUser(event: any) {
    this.firstFormGroup.value.user = event.value;
  }

  editPayment() {
    this.data.date = new Date();
    this.authService.updateByUID(this.data, 'payments');
    this.dialogRef.close();
  }
}
