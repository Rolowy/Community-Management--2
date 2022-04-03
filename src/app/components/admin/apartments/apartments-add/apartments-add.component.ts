import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Apartment } from 'src/app/_interface/apartment';
import { User } from 'src/app/_interface/user';


import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';


@Component({
  selector: 'app-apartments-add',
  templateUrl: './apartments-add.component.html',
  styleUrls: ['./apartments-add.component.scss']
})
export class ApartmentsAddComponent implements OnInit {
  users:any;

  firstFormGroup: FormGroup = this._formBuilder.group({
    owner: ['', Validators.required],
    street: ['', Validators.required],
    buildingnumber: ['', Validators.required],
    apartmentnumber: ['', Validators.required],
    postcode: ['', [Validators.required, Validators.pattern("[0-9]{2}-[0-9]{3}")]],
    area: ['', [Validators.required, Validators.pattern('[0-9]{2}.[0-9]{2}')]],
    rate: ['', Validators.required]
  });


  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ApartmentsAddComponent>,
    public afs: Firestore,
    public authService: AuthServiceService,
    private toast: MatSnackBar) { }

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

    console.log(this.users);
  }

  selectUser(event: any) {
    this.firstFormGroup.value.owner = event.value;
  }

  createBuilding() {
    const model: Apartment = {
      owner: this.firstFormGroup.value.owner,
      street: this.firstFormGroup.value.street,
      buildingnumber: this.firstFormGroup.value.buildingnumber,
      apartmentnumber: this.firstFormGroup.value.apartmentnumber,
      postcode: this.firstFormGroup.value.postcode,
      area: this.firstFormGroup.value.area,
      rate: this.firstFormGroup.value.rate
    };

    this.authService.addApartment(model).then(() => {
      this.authService.viewMessage('Dodano nowy lokal');
      this.dialogRef.close();
    })
  }
}