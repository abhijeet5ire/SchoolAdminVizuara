import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {

    apiKey: "AIzaSyBuHbGlJ3ddtyVwpuChoLv3q0CSB0YES9g",
  
    authDomain: "vizuaraschooldashboard.firebaseapp.com",
  
    projectId: "vizuaraschooldashboard",
  
    storageBucket: "vizuaraschooldashboard.appspot.com",
  
    messagingSenderId: "760418931192",
  
    appId: "1:760418931192:web:74a73e51938367217e060d",
  
    measurementId: "G-NHC5R7SNNE"
  
  };
  

firebase.initializeApp(firebaseConfig);
// Initialize Firebase

export const auth = firebase.default.auth();
// Get a reference to the database service
export const database = firebase.database();
export const db = firebase.firestore(); // Export Firestore instance
// Get a reference to the storage service
export const storage = firebase.storage();