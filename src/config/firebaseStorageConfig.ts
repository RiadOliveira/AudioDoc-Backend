import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'audiodoc-597fe.firebaseapp.com',
  projectId: 'audiodoc-597fe',
  storageBucket: 'audiodoc-597fe.appspot.com',
  messagingSenderId: '169586334628',
  appId: '1:169586334628:web:5bc6d0aa7776e22f343f31',
};

const app = initializeApp(firebaseConfig);
