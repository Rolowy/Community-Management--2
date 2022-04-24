import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Apartment } from 'src/app/_interface/apartment';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-premises-add',
  templateUrl: './premises-add.component.html',
  styleUrls: ['./premises-add.component.scss']
})
export class PremisesAddComponent implements OnInit {
  rate = new FormControl('', Validators.required)
  area = new FormControl('', Validators.required)
  postcode = new FormControl('', Validators.required)

  firstFormGroup: FormGroup = this._formBuilder.group({
    owner: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    buildingnumber: new FormControl('', Validators.min(1)),
    apartmentnumber: new FormControl('', Validators.required),
    postcode: this.postcode,
    area: this.area,
    rate: this.rate
  });

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PremisesAddComponent>,
    public afs: Firestore,
    public authService: AuthService) { }

  ngOnInit() {
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
      this.dialogRef.close();
      this.authService.viewMessageSuccess('Pomyślnie dodano nowy lokal');
    }).catch(error => {
      this.authService.viewMessageError('Wystąpił błąd podczas dodawania lokalu.')
      console.log(error);
    })
  }
}