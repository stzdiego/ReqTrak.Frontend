// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcLLXkDqVNxYNTEUGIX9uzHY_k7QMyW48",
    authDomain: "reqtrak-6ed28.firebaseapp.com",
    projectId: "reqtrak-6ed28",
    storageBucket: "reqtrak-6ed28.firebasestorage.app",
    messagingSenderId: "1094564567854",
    appId: "1:1094564567854:web:217d43575bc2e39ab878bf",
    /* measurementId: "G-8JE983C5JM" */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);