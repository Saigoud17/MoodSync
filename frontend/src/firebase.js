// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7ckn5V873t2QqWUtItLQ0uVX3WECaYU8",
  authDomain: "moodsync-e6922.firebaseapp.com",
  projectId: "moodsync-e6922",
  storageBucket: "moodsync-e6922.firebasestorage.app",
  messagingSenderId: "1079796271782",
  appId: "1:1079796271782:web:4fcaf6347ccfa1ead14267",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
