import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Raports } from 'src/app/_interface/raport';
import { AuthServiceService } from 'src/app/shared/auth-service.service';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getAdditionalUserInfo } from 'firebase/auth';

@Component({
  selector: 'app-raports-add',
  templateUrl: './raports-add.component.html',
  styleUrls: ['./raports-add.component.scss']
})
export class RaportsAddComponent implements OnInit {
  users:any;
  apartments:any;

  form:FormGroup = this.fb.group({
    number: new FormControl('', [Validators.required]),
    user: new FormControl('', [Validators.required]),
    apartment: new FormControl('', [Validators.required]),
    startdate: new FormControl('', [Validators.required]),
    enddate: new FormControl('', [Validators.required]),
    createdAt: new FormControl(new Date),
    otherStatus: this.fb.array([]),
    sum: new FormControl(''),
  })
  

  converter = [
    { label: 'm2'},
    { label: 'm3'},
    { label: 'szt'},
  ]

  constructor(private fb: FormBuilder, public asf: Firestore, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.combiner();
    this.users = this.getUser();
    this.addOtherStatus(); //wymuszenie wykorzystania przynajmniej jednego pola - mini hack
  }

  combiner() {
    this.form.valueChanges.subscribe((value) => {
      this.form.value.sum = 0;
      value.otherStatus.map((result:any) => {this.form.value.sum = this.form.value.sum + result.price * result.amount});
    });
  }

  async getUser() {
    return await this.authService.getUsers();
  }

  get otherStatus() {
    return this.form.get('otherStatus') as FormArray
  }

  userSelected(event:any) {
    this.apartments = this.authService.getApartments(event.value.uid).catch(error =>{ 
      this.authService.viewMessage('Wystąpił błąd podczas pobierania lokali użytkownika');
    });

  }

  buildingSelected(event:any) {
    this.form.value.apartment = event.value;
  }

  addOtherStatus() {
    this.otherStatus.push(this.fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      converter: new FormControl('', Validators.required),
    }));
  }


  removeOtherStatus(i:number) {
    this.otherStatus.removeAt(i);
  }

  SaveRaport() {
    this.form.value.createdAt = new Date;
      this.authService.addRaport(this.form.value).then(() => {
        this.authService.viewMessage('Dodano nowy raport');
      }).catch(error => {
        this.authService.viewMessage('Wystąpił błąd podczas wysyłania żądania.')
      })
  }

}

