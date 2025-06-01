import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB5WdSVE8B1I3UA52eilpuConLatKNMTkQ",
    authDomain: "segunda-parte-proyectoint.firebaseapp.com",
    projectId: "segunda-parte-proyectoint",
    storageBucket: "segunda-parte-proyectoint.firebasestorage.app",
    messagingSenderId: "1099327618680",
    appId: "1:1099327618680:web:921b7a2b69a39c0062378d"
  };
  
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

