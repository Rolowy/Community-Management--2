import { Injectable } from '@angular/core';
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
  docData,
  DocumentReference,
  CollectionReference,
  Firestore,
  onSnapshot,
  query,
  where,
  Unsubscribe,
  Query,
  DocumentData,
  collectionData,
  collectionChanges,
  docSnapshots,
  setDoc,
} from '@angular/fire/firestore';

import { addDoc, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

import { User } from '../_interface/user';

import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EmailAuthCredential, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential } from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apartment } from '../_interface/apartment';
import { Raports } from '../_interface/raport';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
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

  constructor(private auth: Auth, private router: Router, private afs: Firestore, private toast: MatSnackBar) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('UID', user.uid);

        onSnapshot(doc(afs, 'users', `${user.uid}`), (doc) => {
          this.userInfo.next(doc.data() as User);
        });

        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.clear();
      }


    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  async addApartment(model:Apartment) {
    return addDoc(collection(this.afs, 'apartments'), model);
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
      location.reload();
    }).catch(error => {
      window.alert(error);
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
      //  window.alert('Wylogowano');
      localStorage.clear();
      location.reload();
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
