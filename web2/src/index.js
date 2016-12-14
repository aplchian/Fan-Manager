import React from 'react';
import ReactDOM from 'react-dom';
import '../public/styles/custom.css';
const App = require('./App')
const {Match,BrowserRouter} = require('react-router')


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
