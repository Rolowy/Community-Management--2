import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/_interface/user';
import { AuthService } from 'src/app/shared/auth.service';
import { doc, Firestore, updateDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  postcode = new FormControl('', Validators.required)
  phone = new FormControl('')
  bankaccount = new FormControl('', Validators.required)

  form: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phone: this.phone,
    postcode: this.postcode,
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    bankaccount: this.bankaccount,
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    moderator: new FormControl(this.data.moderator)
  })


  constructor(
    public dialogRef: MatDialogRef<UsersEditComponent>,
    private fb: FormBuilder,
    public afs: Firestore,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data:User,
  ) {
  }

  ngOnInit() {

  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  async SaveUser() {
    const dataUser: User = {
      uid: this.data.uid,
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      address: this.form.value.address,
      postcode: this.form.value.postcode,
      bankaccount: this.form.value.bankaccount,
      phone: this.form.value.phone,
      city: this.form.value.city,
      moderator: this.form.value.moderator
    };

    this.authService.update(dataUser, 'users');
    this.dialogRef.close();
  }
}
