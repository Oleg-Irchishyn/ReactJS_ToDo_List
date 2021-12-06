import store from './redux/store';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,

  document.getElementById('root'),
);

reportWebVitals();
