import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/colors.scss';
import './styles/day.scss';
import './styles/night.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
