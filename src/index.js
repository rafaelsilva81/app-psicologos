import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AuthProvider } from './services/auth';
import { FirebaseAppProvider, FirestoreProvider } from 'reactfire';
import { app } from './firebase.config'
import { db } from './services/database'

import Loader from './components/Loader';

ReactDOM.render(
  <React.StrictMode>
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
  document.getElementById('root')
);
