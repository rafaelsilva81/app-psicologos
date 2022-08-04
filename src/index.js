import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseAppProvider, FirestoreProvider } from 'reactfire';
import {app} from './firebase.config'
import { AuthProvider } from './services/auth';
import {db} from './services/database'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <FirebaseAppProvider firebaseApp={app}>
          <FirestoreProvider sdk={db}>
          <App />
          </FirestoreProvider>
      </FirebaseAppProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
