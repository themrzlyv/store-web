// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMPZRJ_9ZVx8sW5XK4ZVKXsKbnncF1U5o",
  authDomain: "themirzaliyev-store.firebaseapp.com",
  projectId: "themirzaliyev-store",
  storageBucket: "themirzaliyev-store.firebasestorage.app",
  messagingSenderId: "90950127588",
  appId: "1:90950127588:web:e2825365e5daa0c78b01f1",
  measurementId: "G-W7VXVQX4SP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };