import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tek-social-5a3d0.firebaseapp.com",
  projectId: "tek-social-5a3d0",
  storageBucket: "tek-social-5a3d0.appspot.com",
  messagingSenderId: "450062996862",
  appId: "1:450062996862:web:03e9df843b0c30c2018f2f"
};


export const app = initializeApp(firebaseConfig);