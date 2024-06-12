import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/fonts.css';
import './styles/reset.css';
import { GlobalStyle } from './styles/globalStyle.js';
import { App } from './components/App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>
);
