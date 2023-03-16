import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgs0QjMS2kKc0xnI0xmzyUNnbeQhSm-00",
  authDomain: "fir-course-aec2b.firebaseapp.com",
  projectId: "fir-course-aec2b",
  storageBucket: "fir-course-aec2b.appspot.com",
  messagingSenderId: "684742331274",
  appId: "1:684742331274:web:7cc21645560b8925bdd673",
  measurementId: "G-BDYC5T2JDR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
