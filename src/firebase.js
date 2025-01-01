import { initializeApp } from "firebase/app";
import { getFirestore, collection, enableIndexedDbPersistence } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCKbtvAidsz4LRa147gjUxbSZSAUWaCXGc",
  authDomain: "react-note-app-5d72b.firebaseapp.com",
  projectId: "react-note-app-5d72b",
  storageBucket: "react-note-app-5d72b.firebasestorage.app",
  messagingSenderId: "77925555183",
  appId: "1:77925555183:web:bbdc7ed43e0f6b2653b41a"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Enable offline persistence
enableIndexedDbPersistence(db)
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            console.log("Multiple tabs open, persistence can only be enabled in one tab at a time.")
        } else if (err.code === 'unimplemented') {
            console.log("The current browser doesn't support persistence.")
        }
    });

const notesCollection = collection(db, "notes")

export { db, notesCollection }