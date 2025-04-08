import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {provideRouter} from '@angular/router';
import {environment} from '../environment';
import {routes} from './app.routes';
import {getFunctions, provideFunctions} from '@angular/fire/functions';
import {getStorage, provideStorage} from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment)),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
