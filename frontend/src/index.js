import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { InventoryProvider } from './context/InventoryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <InventoryProvider>
      <App />
    </InventoryProvider>
  </React.StrictMode>
);

