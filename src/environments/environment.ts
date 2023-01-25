// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  /*  firebase: {
    projectId: 'citas-medicas-test-ups-5e2ac',
    appId: '1:362331161172:web:135f224cb1ea968dd6a3c1',
    storageBucket: 'citas-medicas-test-ups-5e2ac.appspot.com',
    apiKey: 'AIzaSyAqL2A5-3FND33ys24IWdWoztlwoyZtUcI',
    authDomain: 'citas-medicas-test-ups-5e2ac.firebaseapp.com',
    messagingSenderId: '362331161172',
    measurementId: 'G-Y8BEFQWY3H',
  },
  */
  firebaseConfig: {
    apiKey: "AIzaSyAqL2A5-3FND33ys24IWdWoztlwoyZtUcI",
    authDomain: "citas-medicas-test-ups-5e2ac.firebaseapp.com",
    projectId: "citas-medicas-test-ups-5e2ac",
    storageBucket: "citas-medicas-test-ups-5e2ac.appspot.com",
    messagingSenderId: "362331161172",
    appId: "1:362331161172:web:135f224cb1ea968dd6a3c1",
    measurementId: "G-Y8BEFQWY3H"
  },
  production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
