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
    root.render(
      <React.StrictMode>
        <ClerkProvider publishableKey={clerkPublishableKey}>
          <App useClerk={true} />
        </ClerkProvider>
      </React.StrictMode>,
    );
  });
} else {
  root.render(
    <React.StrictMode>
      <App useClerk={false} />
    </React.StrictMode>,
  );
}
