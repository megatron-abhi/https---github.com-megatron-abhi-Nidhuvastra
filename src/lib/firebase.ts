// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCPRiZ3pyxobPaFl_cZ9ZhKw5AbapXroM",
  authDomain: "sareeshree.firebaseapp.com",
  databaseURL: "https://sareeshree-default-rtdb.firebaseio.com",
  projectId: "sareeshree",
  storageBucket: "sareeshree.firebasestorage.app",
  messagingSenderId: "990941697261",
  appId: "1:990941697261:web:869140b961e547875ce8e4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
