// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXZqwSE-ts0uCBDkZIIkPdQLZb5Ithmxo",
  authDomain: "sinuous-transit-479417-h4.firebaseapp.com",
  projectId: "sinuous-transit-479417-h4",
  storageBucket: "sinuous-transit-479417-h4.appspot.com",
  messagingSenderId: "515013642154",
  appId: "1:515013642154:web:1ec5f1fbfb7cff24c58dd3",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore
export const db = getFirestore(app);
