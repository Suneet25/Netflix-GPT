import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5lZP3Uz43AifDDkQ_yeIvecE7n6IKsnY",
  authDomain: "netflixgpt-e0e60.firebaseapp.com",
  projectId: "netflixgpt-e0e60",
  storageBucket: "netflixgpt-e0e60.firebasestorage.app",
  messagingSenderId: "174182742314",
  appId: "1:174182742314:web:10c160ba92ac2ced3c4653",
  measurementId: "G-H4EVQ557N6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();
