import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import axios from 'axios';
axios.defaults.baseURL = '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
