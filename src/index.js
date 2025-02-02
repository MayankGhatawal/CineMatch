import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ClerkProvider } from '@clerk/clerk-react'

axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`

const PUBLISHABLE_KEY = "pk_test_ZmFtb3VzLWdhdG9yLTE2LmNsZXJrLmFjY291bnRzLmRldiQ"
console.log(PUBLISHABLE_KEY);


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
          <RouterProvider router={router}/>
    </Provider>
    </ClerkProvider>
  
  </React.StrictMode>
);
reportWebVitals();
