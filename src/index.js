import React from 'react';
import ReactDOM from 'react-dom';
import {
  store
} from "./store/store.js";
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';
import { Provider } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
