import { Injectable } from '@angular/core';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updatePassword,
  sendPasswordResetEmail
} from '@angular/fire/auth';


import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import {
  collection,
  Firestore,
  onSnapshot,
  query,
  where,
  setDoc,
} from '@angular/fire/firestore';

import { addDoc, deleteDoc, doc, getDoc, getDocs, limit, updateDoc } from "firebase/firestore";

import { User } from '../_interface/user';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential } from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apartment } from '../_interface/apartment';
import { Raports } from '../_interface/raport';
import { Chat } from '../_interface/chat';
import { Payment } from '../_interface/payment';
import { Config } from '../_interface/config'

import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userID: string = '';
  userMod: boolean = false;

  totalprice = new BehaviorSubject<number>(0);


  userInfo = new BehaviorSubject<User>({
    name: '',
    lastname: '',
    uid: '',
    bankaccount: '',
    email: '',
    moderator: false,
    postcode: '',
    city: '',
    address: '',
    phone: '',
  });

  constructor(private auth: Auth,
    private router: Router,
    private afs: Firestore,
    private toast: MatSnackBar,
    private message: NzMessageService,
  ) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userID = user.uid;


        await onSnapshot(doc(afs, 'users', `${user.uid}`), (doc) => {
          localStorage.setItem('datainfo', JSON.stringify(doc.data()));
          this.userMod = doc.get('moderator');
          this.userInfo.next(doc.data() as User);
        });



        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.clear();
      }


    });

  }


  calcOfTheLoad() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const querySnapshot = query(collection(this.afs, 'payments'), where("user.uid", "==", user.uid));
    let items = 0;
    onSnapshot(querySnapshot, (querySnap) => {
      let wpl = 0;
      let obc = 0;

      querySnap.forEach(doc => {
        const data = doc.data() as Payment;

        if (data.status != "WPŁATA") {
          wpl += parseFloat(data.price);
        }
        else {
          obc += parseFloat(data.price);
        }

      })

      items = wpl - obc;

      this.totalprice.next(items);
    })
    return items;
  }


  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  async addChatMessage(user: Chat, message: string) {
    return addDoc(collection(this.afs, 'chat'), {
      uid: user.uid,
      message: message,
    })
  }

  async addApartment(model: Apartment) {
    return addDoc(collection(this.afs, 'apartments'), model);
  }

  async addPayment(model: Payment) {
    return addDoc(collection(this.afs, 'payments'), model);
  }

  async getConfig() {
    const docRef = doc(this.afs, "config", "config");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Raports;
      return data;
    } else {
      console.log("No such document!");
      return {};
    }
  }


  async saveDefaultConfiguration(form: any) {
    await setDoc(doc(this.afs, "config", "config"), {
      name: form.name,
      address: form.address,
      city: form.city,
      postcode: form.postcode
    }).then(() => {
      return this.viewMessageSuccess('Poprawnie udało się zapisać zmiany. :)');
    }).catch(error => { return this.viewMessageError('Coś poszło nie tak. :('); })
  }


  viewMessageSuccess(message: string): void {
    this.message.success(message, {
      nzDuration: 5000
    });
  }

  viewMessageError(message: string): void {
    this.message.error(message, {
      nzDuration: 5000
    });
  }


  async getUser_LastPayment() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const q = query(collection(this.afs, "payments"), where("user.uid", "==", user.uid), limit(3));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      return el.data() as Raports;
    });
  }

  async getUser_LastBurden() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const q = query(collection(this.afs, "payments"), where("user.uid", "==", user.uid), where('status', '==', 'OBCIĄŻENIE'), limit(3));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      return el.data() as Raports;
    });
  }

  async getUser_Premises() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const q = query(collection(this.afs, "apartments"), where("owner", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      return el.data() as Apartment;
    });
  }

  async getUser_Info(uid: string) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const q = query(collection(this.afs, "apartments"), where("owner", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      return el.data() as Apartment;
    });
  }

  async getUser_LastRaport() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const q = query(collection(this.afs, "raports"), where("user.uid", "==", user.uid), limit(1));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      return el.data() as Raports;
    });
  }

  async addRaport(model: Raports) {
    return addDoc(collection(this.afs, 'raports'), model);
  }

  async delete(uid: string, collection: string) {
    await deleteDoc(doc(this.afs, collection, uid)).then(() => {
      this.viewMessageSuccess('Pomyślnie usunięto dane.');
    }).catch(error => {
      this.viewMessageError('Wystąpił błąd podczas usuwania danych..');
      console.log(error);
    })
  }

  async update(data: any, collection: string) {
    ;
    return updateDoc(doc(this.afs, collection, `${data.uid}`), data).then(() => {
      this.viewMessageSuccess('Zaktualizowano dane poprawnie.')
    }).catch(error => {
      this.viewMessageError('Nie udało się zaktualizować danych.')
      console.log(error);
    })
  }

  register(form: User) {
    let originalUser = getAuth().currentUser;

    const user = createUserWithEmailAndPassword(this.auth, form.email, form.password).then(async (user) => {
      if (user) {
        const userData: User = {
          uid: user.user.uid,
          email: user.user.email,
          verifyemail: user.user.emailVerified,
          name: form.name,
          moderator: form.moderator,
          lastname: form.lastname,
          bankaccount: form.bankaccount,
          city: form.city,
          address: form.address,
          postcode: form.postcode,
          phone: form.phone
        }

        await setDoc(doc(this.afs, "users", `${user.user.uid}`), userData).then(() => {
          this.SendVerificationMail();
        }).catch(error => {
          this.viewMessageError('Wystąpił błąd podczas dodawania konta.');
          console.log(error);
        })

        getAuth().updateCurrentUser(originalUser);
      }
    }).catch(error => {
      this.viewMessageError('Email jest już w użytku.');
    })
  }
  
  SendVerificationMail(): void {
    const user = this.auth.currentUser;
    if (user) {
      sendEmailVerification(user).then(() => {
        this.viewMessageSuccess('Wysłano email z potwierdzeniem.');
      }).catch(error => {
        this.viewMessageError('Wystąpił błąd podczas wysyłania potwerdzenia');
        console.log('Sprawdź połączenie z firebase.');
        console.log(error);
      });
    }
    console.log('Nie znaleziono użytkownika');
  }

  async login(form: any) {
    await signInWithEmailAndPassword(this.auth, form.email, form.password).then((user) => {
      this.router.navigate(['dashboard']);
    }).catch(error => {
      this.viewMessageError('Nie udało się zalogować.');
      console.log(error);
    });
  }

  async logout() {
    await signOut(this.auth).then(() => {
      this.router.navigate(['login']);
    })
  }

  async getUsers() {
    const q = await query(collection(this.afs, "users"), where("moderator", "!=", true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      const data = el.data() as User;
      data.uid = el.id;
      return data;
    });
  }

  async getApartments(uid: string) {
    const q = await query(collection(this.afs, "apartments"), where("owner", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      const data = el.data() as Apartment;
      data.uid = el.id;
      return data;
    });
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {

      window.alert('1');
      window.alert(user.email);
      const credential = await EmailAuthProvider.credential((user.email || this.userInfo.value.email), oldPassword);
      window.alert('2');

      window.alert(credential);
      const result = await reauthenticateWithCredential(
        auth.currentUser,
        credential
      )

      window.alert(result);

      window.alert('3');
      await updatePassword(user, newPassword).then(() => {
        return this.viewMessageSuccess('Zmieniono hasło pomyślnie');
      }).catch(error => {
        console.log(error);
        return this.viewMessageError('Wystąpił błąd, prosimy o ponowne zalogowanie się.')
      })
    }
    window.alert('4');
  }

  changePassword2(oldPassword: string, newPassword: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      let credential = EmailAuthProvider.credential(
        this.userInfo.value.email,
        oldPassword
      );

      reauthenticateWithCredential(auth.currentUser, credential)
        .then(result => {
          updatePassword(user, newPassword).then(() => {
            return this.viewMessageSuccess('Zmieniono hasło pomyślnie');
          }).catch(error => {
            return this.viewMessageError('Wystąpił błąd, prosimy o ponowne zalogowanie się.')
          })
        })
    }
  }

  async resetPassword(email: string): Promise<any> {
    await sendPasswordResetEmail(this.auth, email).then(() => {
      this.viewMessageSuccess('Procedura resetowania hasła została wysłana na email');
    }).catch(error => {
      this.viewMessageError('Nie udało się. Sprawdź czy użytkownik ma poprawny email oraz czy jest połączenie z bazą danych.');
      console.log(error);
    })
  }
}
