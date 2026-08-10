import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? '';
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found');
}
const root = ReactDOM.createRoot(rootElement);
if (clerkPublishableKey) {
    import('@clerk/react').then(({ ClerkProvider }) => {
        root.render(_jsx(React.StrictMode, { children: _jsx(ClerkProvider, { publishableKey: clerkPublishableKey, children: _jsx(App, { useClerk: true }) }) }));
    });
}
else {
    root.render(_jsx(React.StrictMode, { children: _jsx(App, { useClerk: false }) }));
}
