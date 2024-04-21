import React, { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const UserContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogIn = () => {
    // setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const gitHubLogIn = () => {
    // setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axios
          .post(`https://jobserver-xyvn.onrender.com/jwt`, {
            email: currentUser.email,
          })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const userInfo = {
    user,
    signUp,
    logIn,
    googleLogIn,
    gitHubLogIn,
    updateUserProfile,
    logOut,
    loading,
    setLoading,
  };
  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default AuthProviders;
