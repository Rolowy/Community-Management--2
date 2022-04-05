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
  });


  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PaymentsAddComponent>,
    public afs: Firestore,
    public authService: AuthServiceService) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    const querySnapshot = await getDocs(collection(this.afs, "users"));
    this.users = querySnapshot.docs.map(el => {
      const data = el.data() as User;
      data.uid = el.id;
      return data;
    });
  }

  selectUser(event: any) {
    this.firstFormGroup.value.user = event.value;
  }

  createPayment() {
    this.authService.addPayment(this.firstFormGroup.value).then(() => {
      this.authService.viewMessage('Dodano nową płatność');
      this.dialogRef.close();
    })
  }
}