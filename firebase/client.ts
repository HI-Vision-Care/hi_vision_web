// src/firebase/client.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Thay các giá trị này bằng biến môi trường trong .env.local của bạn
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Chỉ initialize một lần
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export auth để dùng trong AuthForm
export const auth = getAuth(app);

// Console-log để debug
console.log("🟢 Firebase client initialized", {
  projectId: firebaseConfig.projectId,
});
