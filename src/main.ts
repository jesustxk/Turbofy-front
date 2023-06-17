import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { provideFirebaseApp } from '@angular/fire/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
});
