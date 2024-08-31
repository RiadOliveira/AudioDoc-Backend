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
//   authDomain: 'audiodoc-storage.firebaseapp.com',
//   projectId: 'audiodoc-storage',
//   storageBucket: 'audiodoc-storage.appspot.com',
//   messagingSenderId: '55510653823',
//   appId: '1:55510653823:web:7561516ccc0e3a0d2bd84a',
// };

export const firebaseApp = initializeApp(FIREBASE_CONFIG);
