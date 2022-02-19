import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSqu_5zwdrBcDXjujfl9ByOEIV98Z6ifo",

  authDomain: "test-fd80e.firebaseapp.com",

  databaseURL: "https://test-fd80e.firebaseio.com",

  projectId: "test-fd80e",

  storageBucket: "test-fd80e.appspot.com",

  messagingSenderId: "178286933777",

  appId: "1:178286933777:web:e5035394f2d4c4365cbeb0",

  measurementId: "G-SG7Y1DVB8D",
};

// Initialize Firebase
export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const storage = firebaseApp.storage();

export const storageRef = storage.ref();
