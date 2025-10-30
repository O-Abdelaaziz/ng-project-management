import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions
} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {MatNativeDateModule} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withComponentInputBinding()
      ),
    importProvidersFrom(MatNativeDateModule),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: import.meta.env.NG_APP_FIREBASE_API_KEY,
        authDomain: import.meta.env.NG_APP_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.NG_APP_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.NG_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.NG_APP_FIREBASE_APP_ID,
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
