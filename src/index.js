import React from 'react';
import { render } from 'react-dom'
import App from './App';
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router'
import './index.css';
import h from 'react-hyperscript'
import Home from './home.js'
import Fans from './fans.js'
import StreetTeam from './streetTeam.js'


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/fans" component={Fans}/>
      <Route path="/streetteam" component={StreetTeam}/>
    </Route>
  </Router>
),document.getElementById('root'))
