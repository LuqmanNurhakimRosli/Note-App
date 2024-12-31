import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCKbtvAidsz4LRa147gjUxbSZSAUWaCXGc",
  authDomain: "react-note-app-5d72b.firebaseapp.com",
  projectId: "react-note-app-5d72b",
  storageBucket: "react-note-app-5d72b.firebasestorage.app",
  messagingSenderId: "77925555183",
  appId: "1:77925555183:web:bbdc7ed43e0f6b2653b41a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const notesCollection = collection(db, "notes")
