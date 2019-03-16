import React, { FC, useState, useEffect } from "react";
import { Router, Redirect } from "@reach/router";
import { firebase, db } from "./firebase";
import { Nav } from "./Nav";
import { Channel } from "./Channel";

interface Props {}

const App: FC<Props> = () => {
  const user = useAuth();
  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="channel/:channelId" user={user} />
        <Redirect from="/" to="channel/general" />
      </Router>
    </div>
  ) : (
    <Login />
  );
};

function Login() {
  const initialValue: any = null;
  const [authError, setAuthError] = useState(initialValue);
  const handleSignin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };
  return (
    <div className="Login">
      <h1>Chat</h1>
      <button onClick={handleSignin}>Sign in with Google</button>
      {authError && (
        <div>
          <p>{authError.message}</p>
        </div>
      )}
    </div>
  );
}
function useAuth() {
  const [user, setUser] = useState();

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = { displayName: firebaseUser.displayName, photoURL: firebaseUser.photoURL, uid: firebaseUser.uid };
        setUser(user);
        db.collection("users")
          .doc(user.uid)
          .set(user, { merge: true });
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}

export default App;
