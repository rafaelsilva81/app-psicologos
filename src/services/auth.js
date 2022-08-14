import { createContext, useContext, useState } from "react";
import { app } from "../firebase.config";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { getMessage } from "./customErrorHandler";

const auth = getAuth(app);

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authInfo, setAuthInfo] = useState();

  const reauthenticateUser = (email, pass) => {
    return new Promise((resolve, reject) => {
      reauthenticateWithCredential(
        auth.currentUser,
        EmailAuthProvider.credential(email, pass)
      )
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          reject(getMessage(error.code));
        });
    });
  };

  const changePassword = (newPass) => {
    return new Promise((resolve, reject) => {
      updatePassword(auth.currentUser, newPass)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          reject(getMessage(error.code));
        });
    });
  };
  const resetPassword = ({ email }) => {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("Email enviado");
          resolve(true);
        })
        .catch((error) => {
          reject(getMessage(error.code));
        });
    });
  };

  const logIn = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Logado com sucesso");
          setAuthInfo({ initialized: true, loggedIn: true, user: user });
          resolve(user);
        })
        .catch((error) => {
          reject(getMessage(error.code));
        });
    });
  };

  const logOut = () => {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => {
          console.log("Deslogado com sucesso");
          setAuthInfo({ initialized: true, loggedIn: false, user: null });
          resolve(true);
        })
        .catch((error) => {
          reject(getMessage(error.code));
        });
    });
  };

  // TODO: ARRUMAR ESSA FUNÇÃO
  const initializeAuth = async () => {
    console.log("initializeAuth was called, searching user");
    await auth.onAuthStateChanged((user) => {
      if (user != null) {
        console.log("user found");
        setAuthInfo({
          initialized: true,
          loggedIn: true,
          user: user,
        });
      } else {
        console.log("user not found");
        setAuthInfo({
          initialized: true,
          loggedIn: false,
          user: null,
        });
      }
    });
  };

  const checkFirstAccess = () => {
    let response = window.localStorage.getItem("HAS_ACCESSED") || false;
    if (response === false) {
      console.log("Its your first access");
      window.localStorage.setItem("HAS_ACCESSED", true);
    }

    return response;
  };

  let v = {
    authInfo,
    resetPassword: resetPassword,
    logOut: logOut,
    logIn: logIn,
    changePassword: changePassword,
    reauthenticateUser,
    initializeAuth,
    checkFirstAccess,
  };

  return <AuthContext.Provider value={v} {...props} />;
};

export const useAuth = () => useContext(AuthContext);
