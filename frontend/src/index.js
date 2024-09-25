import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container">
      <Auth0Provider
        domain="hrishikesh-ht333.eu.auth0.com"
        clientId="7KvdzwucJFvfDwGhLVy1EmkhEaEzZOC5"
        authorizationParams={{
          audience:"https://hrishikesh-ht333.eu.auth0.com/api/v2/",
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
