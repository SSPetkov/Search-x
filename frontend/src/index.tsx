import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';

const root = document.getElementById('root');
const reactRoot = createRoot(root as HTMLElement);
reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
