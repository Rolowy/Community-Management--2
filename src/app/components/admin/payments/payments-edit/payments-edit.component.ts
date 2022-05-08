
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_interface/user';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from 'src/app/_interface/payment';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-payments-edit',
  templateUrl: './payments-edit.component.html',
  styleUrls: ['./payments-edit.component.scss']
})
export class PaymentsEditComponent implements OnInit {
  amount = new FormControl('', [Validators.required])

  form = [
    { label: 'WPŁATA' },
    { label: 'OBCIĄŻENIE' }
  ]

  firstFormGroup: FormGroup = this.fb.group({
    amount: this.amount,
    status: new FormControl(this.data.status, Validators.required),
    date: new FormControl(new Date(this.data.date.seconds * 1000), Validators.required)
  });


  constructor(
    public dialogRef: MatDialogRef<PaymentsEditComponent>,
    private fb: FormBuilder,
    private afs: Firestore,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Payment,
  ) { }

  ngOnInit() {
  }

  editPayment() {
    this.data.date = new Date();
    this.data.amount = this.amount.value;
    this.authService.update(this.data, 'payments');
    this.dialogRef.close();
  }
}
