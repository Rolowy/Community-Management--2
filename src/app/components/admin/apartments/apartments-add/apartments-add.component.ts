import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apartment } from 'src/app/_interface/apartment';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-apartments-add',
  templateUrl: './apartments-add.component.html',
  styleUrls: ['./apartments-add.component.scss']
})
export class ApartmentsAddComponent implements OnInit {
  rate = new FormControl('', Validators.required)

  firstFormGroup: FormGroup = this._formBuilder.group({
    owner: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    buildingnumber: new FormControl(''),
    apartmentnumber: new FormControl('', Validators.required),
    postcode: new FormControl('', [Validators.required, Validators.pattern("[0-9]{2}-[0-9]{3}")]),
    area: new FormControl('', [Validators.required, Validators.pattern('([0-9]*\.?[0-9]{2})|[0-9]')]),
    rate: this.rate
  });

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ApartmentsAddComponent>,
    public afs: Firestore,
    public authService: AuthService,
    private toast: MatSnackBar) { }

  ngOnInit() {
  }

  selectUser(event: any) {
    this.firstFormGroup.value.owner = event.value;
  }

  createBuilding() {
    const model: Apartment = {
      owner: this.firstFormGroup.value.owner,
      name: this.firstFormGroup.value.owner.name,
      lastname: this.firstFormGroup.value.owner.lastname,
      street: this.firstFormGroup.value.street,
      buildingnumber: this.firstFormGroup.value.buildingnumber,
      apartmentnumber: this.firstFormGroup.value.apartmentnumber,
      postcode: this.firstFormGroup.value.postcode,
      area: this.firstFormGroup.value.area,
      rate: this.firstFormGroup.value.rate
    };

    this.authService.addApartment(model).then(() => {
      this.authService.viewMessageSuccess('Pomyślnie dodano nowy lokal');
      this.dialogRef.close();
    }).catch(error => {
      this.authService.viewMessageError('Wystąpił błąd podczas dodawania lokalu.')
      console.log(error);
    })
  }
}