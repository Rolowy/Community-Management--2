import { Injectable, NgZone } from '@angular/core';
import {
  authState,
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  user,
  sendEmailVerification,
  signOut,
  updatePassword,
  sendPasswordResetEmail
} from '@angular/fire/auth';

import {
  collection,
  Firestore,
  onSnapshot,
  query,
  where,
  setDoc,
} from '@angular/fire/firestore';

import { addDoc, deleteDoc, doc, getDocs, limit, updateDoc } from "firebase/firestore";

import { User } from '../_interface/user';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential } from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apartment } from '../_interface/apartment';
import { Raports } from '../_interface/raport';
import { Chat } from '../_interface/chat';
import { Payment } from '../_interface/payment';
import { jsonEval } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userID:string = '';
  userMod:boolean = false;

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


  obliczanieObciazenia() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const querySnapshot = query(collection(this.afs, 'payments'), where("user.uid", "==", user.uid));
    let items = 0;
    onSnapshot(querySnapshot, (querySnap) => {
      let wpl = 0;
      let obc = 0;

      querySnap.forEach(doc => {
        const data = doc.data() as Payment;

        if(data.status != "WPŁATA")
        {
          wpl += parseFloat(data.price);
        }
        else
        {
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

  async addChatMessage(user:Chat, message:string) {
    return addDoc(collection(this.afs, 'chat'), {
      uid: user.uid,
      message: message,
    })
  }

  async addApartment(model:Apartment) {
    return addDoc(collection(this.afs, 'apartments'), model);
  }

  async addPayment(model:Payment) {
    return addDoc(collection(this.afs, 'payments'), model);
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

    console.log(user.uid);

    
    const q = query(collection(this.afs, "payments"), where("user.uid", "==", user.uid), where('status', '==', 'OBCIĄŻENIE'), limit(3));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      return el.data() as Raports;
    });
  }

  async getUser_Premises() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    console.log(user.uid);

    
    const q = query(collection(this.afs, "apartments"), where("owner", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      return el.data() as Apartment;
    });
  }

  async getUser_Info(uid:string) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    console.log(user.uid);

    
    const q = query(collection(this.afs, "apartments"), where("owner", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      return el.data() as Apartment;
    });
  }


  

  async getUser_LastRaport() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    console.log(user.uid);

    
    const q = query(collection(this.afs, "raports"), where("user.uid", "==", user.uid), limit(1));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(el => {
      return el.data() as Raports;
    });
  }
  

  async addRaport(model:Raports) {
    return addDoc(collection(this.afs, 'raports'), model);
  }

  viewMessage(message:string) {
    return this.toast.open(message, 'X', { duration: 5000});
  }

  async delete(uid:string, collection:string) {
    await deleteDoc(doc(this.afs, collection, uid)).then(() => {
      this.viewMessage('Usunięto dane poprawnie');
    }).catch(error => {
      this.viewMessage('Coś poszło nie tak, spróbuj ponownie..');
    })
  }

  async update(data:any, collection:string) {
    return updateDoc(doc(this.afs, collection, `${data.uid}`), data);
  }

  register(form:User) {
    createUserWithEmailAndPassword(this.auth, form.email, form.password).then(async (user) => {
      if (user) {
        const userData: User = {
          uid: user.user.uid,
          email: user.user.email,
          name: form.name,
          moderator: true,
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
          window.alert('Wystąpił błąd podczas dodawania konta. Skontatuj się z administratorem.');
        })
      }
      window.alert('udało się')
    }).catch(error => {
      window.alert('Email jest już w użytku.');
    })
  }

  SendVerificationMail(): void {
    const user = this.auth.currentUser;

    if (user) {

      sendEmailVerification(user).then(() => {
        window.alert('Wysłano email z potwierdzeniem');
      }).catch(error => {
        window.alert('Wystąpił błąd podczas wysyłania potwierdzenia, skontaktuj się administratorem.');
      });
    }
    window.alert('Nie znaleziono użytkownika');
  }

  async login(form: any) {
    await signInWithEmailAndPassword(this.auth, form.email, form.password).then((user) => {
        this.router.navigate(['dashboard']);
    }).catch(error => {
      this.viewMessage(error);
    });
  }

  async deleteAccount() {
    await signInWithEmailAndPassword(this.auth, 'rolowaty@gmail.com', 'Nocka1207').then((user) => {
      user.user.delete().then(() => {
        window.alert('Usunięto twoje konto pomyślnie.');
        this.logout();
      }).catch(error => {
        window.alert(error);
      })
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

  async getApartments(uid:string) {
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
      const credential = await EmailAuthProvider.credential((user.email || ''), oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword).then(() => {
        window.alert('Zmieniono hasło: ' + newPassword);
      }).catch(error => {
        window.alert(error);
      })
    }
  }

  async resetPassword(email: string): Promise<any> {
    await sendPasswordResetEmail(this.auth, email).then(() => {
      window.alert('Procedura resetowania hasła została wysłana na twój email.');
    });
  }
}
