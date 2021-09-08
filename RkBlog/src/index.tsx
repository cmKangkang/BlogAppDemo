import React from 'react';
import ReactDOM from 'react-dom';
import Page from './pages/App';
import './assets/styles/global.less';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  // <React.StrictMode>
    <Router>
      <Page />
    </Router>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);
reportWebVitals();
