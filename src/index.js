import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Container from './container';

ReactDOM.render(
    <Router>
      <Container />
    </Router>,
  document.getElementById('root')
);

