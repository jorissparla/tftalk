import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyASBm98Nt7UP3GZFGu3wMKAIXpe9xsbZOM",
  authDomain: "chatapp-1b355.firebaseapp.com",
  databaseURL: "https://chatapp-1b355.firebaseio.com",
  projectId: "chatapp-1b355",
  storageBucket: "chatapp-1b355.appspot.com",
  messagingSenderId: "966247918101"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const firestore = firebase.firestore;

export { db, firebase, firestore };
