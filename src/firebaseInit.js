// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADmXMP0ZCC2wRN8J971agYUumstkfs3YQ",
  authDomain: "keep-it-76f5c.firebaseapp.com",
  projectId: "keep-it-76f5c",
  storageBucket: "keep-it-76f5c.firebasestorage.app",
  messagingSenderId: "120640967874",
  appId: "1:120640967874:web:836f090b5b76c38cf9175b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


