import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase with error handling
let app;
let db;

try {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    console.log("Initializing Firebase app...");
    app = initializeApp(firebaseConfig);
  } else {
    console.log("Firebase app already initialized");
    app = getApp();
  }

  // Initialize Firestore
  db = getFirestore(app);
  console.log("Firestore initialized successfully");

  // Log Firebase configuration (without sensitive data)
  console.log("Firebase initialized with project:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw new Error("Failed to initialize Firebase. Check your configuration.");
}

export { app, db };