import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import ScrollTop from './component/ScrollTop';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop />
        <App />
      </BrowserRouter>
    </Provider>

);

