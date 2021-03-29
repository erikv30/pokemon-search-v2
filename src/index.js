import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import Store from './Store';
import {HashRouter} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={Store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

