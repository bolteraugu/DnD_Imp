import firebase from "firebase";
import "firebase/auth";

import firebaseConfig from "./firebaseConfig";
import * as Facebook from "expo-facebook";

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();
