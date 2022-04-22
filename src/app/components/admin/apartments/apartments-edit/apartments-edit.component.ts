import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';
import { Apartment } from 'src/app/_interface/apartment';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/_interface/user';
import { collection, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-apartments-edit',
  templateUrl: './apartments-edit.component.html',
  styleUrls: ['./apartments-edit.component.scss']
})
export class ApartmentsEditComponent implements OnInit {
  users: any;

  form: FormGroup = this.fb.group({
    owner: new FormControl(this.data.owner.uid, [Validators.required]),
    apartmentnumber: new FormControl('', Validators.required),
    buildingnumber: new FormControl(''),
    street: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    rate: new FormControl('', Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<ApartmentsEditComponent>,
    private fb: FormBuilder,
    private afs: Firestore,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:Apartment,
  ) {}

  ngOnInit() {
    this.users = this.authService.getUsers();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    const model: Apartment = {
      uid: this.data.uid,
      name: this.form.value.owner.name,
      lastname: this.form.value.owner.lastname,
      owner: this.form.value.owner,
      apartmentnumber:this.form.value.apartmentnumber,
      buildingnumber: this.form.value.buildingnumber,
      street: this.form.value.street,
      postcode: this.form.value.postcode,
      area: this.form.value.area,
      rate: this.form.value.rate,
    };

    this.authService.update(model, 'apartments').then(() => {
      this.authService.viewMessageSuccess('Pomyślnie edytowano lokal');
    }).catch(error => {
      this.authService.viewMessageError('Wystąpił błąd poczas dodawania lokalu.');
      console.log(error);
    });

    this.dialogRef.close();
  }
}
