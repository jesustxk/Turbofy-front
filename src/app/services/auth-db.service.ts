import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthDbService {

  private snapshotChangesSubscription: any;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) { }

  unsubscribeOnLogOut() {
    this.snapshotChangesSubscription.unsubscribe();
  }

}
