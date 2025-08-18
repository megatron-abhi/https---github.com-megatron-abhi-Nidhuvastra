// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYkAsDIWCEaNek2ovmtVTuFyJDJHTqfvw",
  authDomain: "nidhuvastra-a6a86.firebaseapp.com",
  databaseURL: "https://nidhuvastra-a6a86-default-rtdb.firebaseio.com",
  projectId: "nidhuvastra-a6a86",
  storageBucket: "nidhuvastra-a6a86.firebasestorage.app",
  messagingSenderId: "236711523695",
  appId: "1:236711523695:web:731c52797318dba741649a",
  measurementId: "G-7BTTFDW6MC"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);
// Conditionally initialize analytics only in the browser
if (typeof window !== 'undefined') {
    getAnalytics(app);
}


export { app, auth, db };
