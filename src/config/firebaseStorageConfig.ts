import { FirebaseOptions, initializeApp } from 'firebase/app';

const FIREBASE_CONFIG: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'audiodoc-4444.firebaseapp.com',
  projectId: 'audiodoc-4444',
  storageBucket: 'audiodoc-4444.appspot.com',
  messagingSenderId: '830002409114',
};

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: 'audiodoc-597fe.firebaseapp.com',
//   projectId: 'audiodoc-597fe',
//   storageBucket: 'audiodoc-597fe.appspot.com',
//   messagingSenderId: '169586334628',
//   appId: '1:169586334628:web:5bc6d0aa7776e22f343f31',
// };

export const firebaseApp = initializeApp(FIREBASE_CONFIG);
