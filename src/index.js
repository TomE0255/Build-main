import React from 'react';
import ReactDOM from 'react-dom/client';
import { preload, preinit } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeContext';

// Preload critical resources
preload('/logo192.png', { as: 'image' });
preinit('/index.css', { as: 'style' });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
