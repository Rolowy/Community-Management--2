
import { Component, Inject, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
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
    price: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    date: new FormControl(new Date(this.data.date.seconds*1000), Validators.required),
    createdAt: new FormControl('')
  });


  constructor(
  public dialogRef: MatDialogRef<PaymentsEditComponent>,
    private fb: FormBuilder,
    private afs: Firestore,
    private authService: AuthServiceService,
    @Inject(MAT_DIALOG_DATA) public data:Payment,
  ) {}

  ngOnInit() {
    this.users = this.authService.getUsers();
  }

  selectUser(event: any) {
    this.firstFormGroup.value.user = event.value;
  }

  editPayment() {

  }
}
