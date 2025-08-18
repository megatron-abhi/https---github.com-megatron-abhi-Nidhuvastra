// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
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

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
    // Point to the RTDB emulator
    // Note: The RTDB emulator needs to be started with `firebase emulators:start`
    try {
        connectDatabaseEmulator(db, 'localhost', 9000);
    } catch(e) {
        // Silently ignore if emulator is not running
    }
    
    // Point to the Auth emulator
    // Note: The Auth emulator needs to be started with `firebase emulators:start`
    try {
        connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
    } catch(e) {
        // Silently ignore if emulator is not running
    }
}


// Conditionally initialize analytics only in the browser
if (typeof window !== 'undefined') {
    getAnalytics(app);
}


export { app, auth, db };