import React, { Component } from 'react';
const {
  Router,
  Route,
  hashHistory,
  Link
} = require('react-router')
const syncDB = require('./helpers/syncDB.js')
const h = require('react-hyperscript')
const Home = require('./home.js')
const xhr = require('xhr')
const NavLink = require('./components/NavLink.js')



module.exports = React.createClass({
  getInitialState: function(){
    return ({
      syncClass: 'fr mr5 pointer red'
    })
  },
  componentDidMount: function(){
    syncDB.load()
  },
  sync: function(){
    var success = syncDB.sync()
    if(success = 'success'){
      this.setState({
        syncClass: 'fr mr5 pointer green'
      })
    }
  },
  render: function(){
    return (
      <div>
      <header>
        <nav>
          <div className="logo"/>
          <ul className="bb b--light-gray w-90 db center pb2" role="nav">
            <NavLink title="Fans" path="/"/>
          </ul>
        </nav>
      </header>
      <div className="sub-menu">
        <ul>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/streetteam">Street Team</Link>
          </li>
          <li>
            <Link to="/addfan">Add Fan</Link>
          </li>
        </ul>
      </div>
      {this.props.children}
      <footer/>
      </div>
    )
  }
})
