import { Component, OnInit, ɵisObservable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, getDocs, limit, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { Adverts } from 'src/app/_interface/adverts';
import { AdvertAddComponent } from './advert-add/advert-add.component';
import { AdvertEditComponent } from './advert-edit/advert-edit.component';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {
  adverts = new BehaviorSubject<Adverts[]>([]);
  len = new BehaviorSubject<number>(1);


  constructor(public afs: Firestore, public authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAdverts();
  }

  addAdvert() {
    this.dialog.open(AdvertAddComponent, {
      width: "500px"
    });
  }

  editAdvert(el:Adverts) {
    this.dialog.open(AdvertEditComponent, {
      width: "500px",
      data: el
    });
  }

  delete(data:any) {
    this.authService.delete(data.uid, 'adverts')
  }


  getAdverts() {
    const q = query(collection(this.afs, "adverts"), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      let adverts:any = [];
      querySnapshot.forEach((doc) => {
        adverts.push({...doc.data(), uid:doc.id});
      });
      //console.log(adverts);
      this.len.next(adverts.length);
      this.adverts.next(adverts);
    });
    
  }

  showAdvert(value:Adverts):void {
    
  }
}
