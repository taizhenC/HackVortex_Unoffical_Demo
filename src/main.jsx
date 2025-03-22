import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import your main component
import { BrowserRouter } from 'react-router-dom'; // If using routing
import './index.css';  // Import global styles (optional)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
