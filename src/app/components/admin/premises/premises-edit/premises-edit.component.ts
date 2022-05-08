import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';
import { Apartment } from 'src/app/_interface/apartment';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-premises-edit',
  templateUrl: './premises-edit.component.html',
  styleUrls: ['./premises-edit.component.scss']
})
export class PremisesEditComponent implements OnInit {
  postcode = new FormControl('', Validators.required)
  area = new FormControl('', Validators.required)
  rate = new FormControl('', Validators.required)

  firstFormGroup: FormGroup = this._formBuilder.group({
    apartmentnumber: new FormControl('', Validators.required),
    buildingnumber: new FormControl(''),
    street: new FormControl('', Validators.required),
    postcode: this.postcode,
    area: this.area,
    rate: this.rate
  })


  constructor(
    public dialogRef: MatDialogRef<PremisesEditComponent>,
    private _formBuilder: FormBuilder,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Apartment,
  ) {
  }

  ngOnInit() {
    this.firstFormGroup.patchValue({
      street: this.data.street,
      buildingnumber: this.data.buildingnumber,
      apartmentnumber: this.data.apartmentnumber
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editApartment() {
    const model: Apartment = {
      uid: this.data.uid,
      owner: this.data.owner,
      apartmentnumber: this.firstFormGroup.value.apartmentnumber,
      buildingnumber: this.firstFormGroup.value.buildingnumber,
      street: this.firstFormGroup.value.street,
      postcode: this.firstFormGroup.value.postcode,
      area: this.firstFormGroup.value.area,
      rate: this.firstFormGroup.value.rate,
    };

    this.authService.update(model, 'apartments')
    this.dialogRef.close();
  }
}
