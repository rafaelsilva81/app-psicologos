import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { AuthProvider } from "./services/auth";
import { FirebaseAppProvider, FirestoreProvider } from "reactfire";
import { app } from "./firebase.config";
import { db } from "./services/database";

import Loader from "./components/Loader";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing:border-box;
  }
  body, html {
    margin:0;
    padding:0;
    height:100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Fira Sans', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #121212;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <FirebaseAppProvider firebaseApp={app}>
        <FirestoreProvider sdk={db}>
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        </FirestoreProvider>
      </FirebaseAppProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
