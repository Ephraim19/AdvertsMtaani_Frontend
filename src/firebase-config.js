// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMiHyTt5X7IDoZLu3Etx5BFbEWprehfsc",
  authDomain: "myblog-c5f96.firebaseapp.com",
  projectId: "myblog-c5f96",
  storageBucket: "myblog-c5f96.appspot.com",
  messagingSenderId: "1045664614039",
  appId: "1:1045664614039:web:d78646e90137bb2115cbd2",
  measurementId: "G-XT15BGXNG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();