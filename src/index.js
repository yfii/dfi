import network from 'network';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

import 'assets/scss/material-kit-pro-react.scss?v=1.9.0';
import './styles/index.scss';
import './i18n';

if (network) {
  ReactDOM.render(<Root />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// import * as serviceWorker from './serviceWorker';
// serviceWorker.unregister();
