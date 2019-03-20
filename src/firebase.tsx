import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { User } from "./types";

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
const rtdb = firebase.database();

export function setupPresence(user: any) {
  const isOffLineForRTDB = {
    state: "offline",
    lastchanged: firebase.database.ServerValue.TIMESTAMP
  };
  const isOnLineForRTDB = {
    state: "online",
    lastchanged: firebase.database.ServerValue.TIMESTAMP
  };
  const isOffLineForFirestore = {
    state: "offline",
    lastchanged: firebase.firestore.FieldValue.serverTimestamp()
  };
  const isOnLineForFirestore = {
    state: "online",
    lastchanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const rtdbRef = rtdb.ref("/status/" + user.uid);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref(".info/connected").on("value", async snapshot => {
    if (snapshot) {
      if (snapshot.val() === false) {
        userDoc.update({ status: isOffLineForFirestore });
        return;
      }
      await rtdbRef.onDisconnect().set(isOffLineForRTDB);
      rtdbRef.set(isOnLineForRTDB);
      userDoc.update({ status: isOnLineForFirestore });
    }
  });
}

export { db, firebase, firestore, rtdb };
