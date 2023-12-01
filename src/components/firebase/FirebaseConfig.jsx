import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDtluII2w8FXHEq_lORi3HnbArZ2xD3XnQ",
  authDomain: "blog-c455f.firebaseapp.com",
  projectId: "blog-c455f",
  storageBucket: "blog-c455f.appspot.com",
  messagingSenderId: "553589820728",
  appId: "1:553589820728:web:7ea0cce2028c5a45cd05cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {fireDB, auth, storage}