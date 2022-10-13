import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthProvider } from "./services/old/auth";
import { FirebaseAppProvider, FirestoreProvider, StorageProvider } from "reactfire";
import { app, auth, firestore, storage } from "./services";

import Loader from "./common/Loader";
import { createGlobalStyle } from "styled-components";

/* Theme variables */
import "./index.css";

/* TODO: Fix modals */
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

  .page-header {
    margin-top: 3rem;
  }
`;

/* React 18 create root */
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <FirebaseAppProvider firebaseApp={app} suspense={true}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>
          <AuthProvider sdk={auth}>
            <Suspense fallback={<Loader />}>
              <App />
            </Suspense>
          </AuthProvider>
        </StorageProvider>
      </FirestoreProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
);
