import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './services/auth';
import { DatabaseProvider } from './services/database';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DatabaseProvider>
        <App />
      </DatabaseProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
