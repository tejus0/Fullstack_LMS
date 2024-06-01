// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyRCiW3FdjTZN7KpzWirlALYhwNl1cbMU",
    authDomain: "lead-9b886.firebaseapp.com",
    projectId: "lead-9b886",
    storageBucket: "lead-9b886.appspot.com",
    messagingSenderId: "299662915818",
    appId: "1:299662915818:web:84d51f7f351d088a00ff93",
    measurementId: "G-R53YH8CMSL"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
export default app;