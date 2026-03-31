
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log("Fluency Coach: Initializing application...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Fluency Coach: Could not find root element to mount to");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Fluency Coach: Application mounted successfully.");
} catch (error) {
  console.error("Fluency Coach: Fatal error during mounting:", error);
}
