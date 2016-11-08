import React from 'react';
import { render } from 'react-dom'
import App from './App';
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router'
import h from 'react-hyperscript'
import Home from './home.js'
import Search from './components/Search.js'
import StreetTeam from './components/StreetTeam.js'
import Fan from './components/Fan.js'
import AddFan from './components/AddFan.js'
import EditFan from './components/EditFan.js'




render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/search" component={Search}/>
      <Route path="/fans" component={Search}/>
      <Route path="/streetteam" component={StreetTeam}/>
      <Route path="/fan/:id" component={Fan}/>
      <Route path="/fan/edit/:id" component={EditFan}/>
      <Route path="/addfan" component={AddFan}/>
    </Route>
  </Router>
),document.getElementById('root'))
