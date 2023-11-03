// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAk1BaH44uF0kIbIB0QJglyXwUcurq3txo",
  authDomain: "urlshortener-cb2db.firebaseapp.com",
  projectId: "urlshortener-cb2db",
  storageBucket: "urlshortener-cb2db.appspot.com",
  messagingSenderId: "259198767460",
  appId: "1:259198767460:web:d9e185cc6e0a9d7fd52a71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app);
export const dbRef = ref(database);

