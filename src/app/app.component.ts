import { Component } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { IonicModule } from '@ionic/angular';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, AngularFirestoreModule, AngularFireAuthModule, AngularFireStorageModule, AngularFireDatabaseModule],
})
export class AppComponent {
  constructor() {
    defineCustomElements(window);
  }
}
