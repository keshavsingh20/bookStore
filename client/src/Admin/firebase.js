// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGmSnnmkoEG-Nv3ge56PWAUPFaoD9t20U",
  authDomain: "bookstore-bb2e9.firebaseapp.com",
  projectId: "bookstore-bb2e9",
  storageBucket: "bookstore-bb2e9.appspot.com",
  messagingSenderId: "247478700780",
  appId: "1:247478700780:web:c88d47bf43231cc49633c9",
  measurementId: "G-BLTZF4J8PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;