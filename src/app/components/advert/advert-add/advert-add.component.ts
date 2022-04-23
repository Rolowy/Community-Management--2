import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from 'firebase/firestore';

@Component({
  selector: 'app-advert-add',
  templateUrl: './advert-add.component.html',
  styleUrls: ['./advert-add.component.scss']
})
export class AdvertAddComponent {
  form: FormGroup = this.fb.group({
    uid: new FormControl(''),
    user: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    desc: new FormControl('', [Validators.required, Validators.minLength(4)]),
    createdAt: new Date()
  })


  constructor(
    public dialogRef: MatDialogRef<AdvertAddComponent>,
    private fb: FormBuilder,
    public afs: Firestore,
  ) {
  }

  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  async SaveUser() {
    this.dialogRef.close();
  }
}
