// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "sareeshree",
  appId: "1:990941697261:web:869140b961e547875ce8e4",
  storageBucket: "sareeshree.firebasestorage.app",
  apiKey: "AIzaSyCCPRiZ3pyxobPaFl_cZ9ZhKw5AbapXroM",
  authDomain: "sareeshree.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "990941697261"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
