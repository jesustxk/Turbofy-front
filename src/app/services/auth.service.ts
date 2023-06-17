import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthDbService } from './auth-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(public afs: AngularFirestore, private authDbService: AuthDbService, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');

      } else {
        localStorage.setItem('user', '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }

  doLogin(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  createUser(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  doLogout() {
    return new Promise<void>((resolve, reject) => {
      this.afAuth.signOut()
        .then(() => {
          localStorage.removeItem('user');
          this.authDbService.unsubscribeOnLogOut();
          resolve();
        }).catch((error) => {
          console.log(error);
          reject();
        });
    })
  }

}