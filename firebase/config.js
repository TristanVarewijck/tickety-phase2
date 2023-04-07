import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import {getFunctions, connectFunctionsEmulator} from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app); 
const database = getFirestore(app); 
const auth = getAuth(app); 

if(typeof window !== "undefined" && window.location.hostname === "localhost") {
    connectFunctionsEmulator(functions, "localhost", 5001);
    connectFirestoreEmulator(database, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");  
}

export { functions, auth, database };