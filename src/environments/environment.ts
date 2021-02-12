// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDjZ8kRBqxRkIMBqpnGty5KBxVZbHmtlz4',
    authDomain: 'prayer-walls.firebaseapp.com',
    projectId: 'prayer-walls',
    storageBucket: 'prayer-walls.appspot.com',
    messagingSenderId: '302621949196',
    appId: '1:302621949196:web:ee07e9b3a5b0aeea375d29',
    measurementId: 'G-ETKGT7JPKS'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
