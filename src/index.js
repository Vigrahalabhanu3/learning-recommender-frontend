import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

// PWA Service Worker Registration
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL || ''}/sw.js`;
        navigator.serviceWorker
            .register(swUrl)
            .then(reg => {
                console.log('SW registered:', reg);
                // Check for updates every 60 seconds
                setInterval(() => {
                    if (reg.update) reg.update();
                }, 60000);
            })
            .catch(err => console.log('SW error:', err));
    });
}
