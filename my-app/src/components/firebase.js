import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";  // Import Realtime Database
import { getStorage } from "firebase/storage";    // Import Firebase Storage
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyDq2giEnysYQCXjHxRG2LwnPK0TUkkjVD0",
    authDomain: "phantom-xerox.firebaseapp.com",
    databaseURL: "https://phantom-xerox-default-rtdb.firebaseio.com",
    projectId: "phantom-xerox",
    storageBucket: "phantom-xerox.appspot.com",
    messagingSenderId: "240431722732",
    appId: "1:240431722732:web:9f05ad4a9fe1e103feb5c9",
    measurementId: "G-NERJT0NF4W"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);  // Initialize Realtime Database
const storage = getStorage(app);  // Initialize Firebase Storage
const firestore = getFirestore(app); // Initialize Firestore

export { db, storage, firestore };  // Export for use in other parts of your app
