import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app/app';
import '@/styles/globals.css';

const redirect = sessionStorage.getItem('kubesage-redirect');
if (redirect) {
  sessionStorage.removeItem('kubesage-redirect');
  window.history.replaceState(null, '', `/kubesage-web${redirect}`);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
