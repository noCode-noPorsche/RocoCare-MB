// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwFrpEQM_p3tjYa3G64cory7PsX0aI-cs",
  authDomain: "robo-care.firebaseapp.com",
  projectId: "robo-care",
  storageBucket: "robo-care.firebasestorage.app",
  messagingSenderId: "541732867997",
  appId: "1:541732867997:web:7810c83d0a232446b6e974",
  measurementId: "G-X4W8J3LP3N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export { app, storage };
