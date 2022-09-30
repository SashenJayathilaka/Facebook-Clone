import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA0FIQ8E4Jk5IKYB5UiNoicINFSC0cEPY",
  authDomain: "facebook-clone-49bb7.firebaseapp.com",
  projectId: "facebook-clone-49bb7",
  storageBucket: "facebook-clone-49bb7.appspot.com",
  messagingSenderId: "777181590738",
  appId: "1:777181590738:web:6aa9d5e97956187665290b",
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
