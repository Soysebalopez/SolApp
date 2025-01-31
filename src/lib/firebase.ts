import { initializeApp as firebaseInit, getApps as getFirebaseApps } from '@firebase/app';
import type { FirebaseApp } from '@firebase/app';
import { getAuth, type Auth } from '@firebase/auth';
import { getFirestore, type Firestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app: FirebaseApp = getFirebaseApps().length === 0 ? firebaseInit(firebaseConfig) : getFirebaseApps()[0];
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app); 