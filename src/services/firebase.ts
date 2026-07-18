import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOS3SBlXzlVBq5ufE7E4eS11KwdaqSCG4",
  authDomain: "kavach-health.firebaseapp.com",
  projectId: "kavach-health",
  storageBucket: "kavach-health.firebasestorage.app",
  messagingSenderId: "859758406199",
  appId: "1:859758406199:web:e7feaec529af0a3e7dadb2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;