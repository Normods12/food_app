import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./context/AuthContext";
import { StoreProvider } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <StoreProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </StoreProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
