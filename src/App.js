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
        <h1 className="tc avenir">Fan DB</h1>
        <span className={this.state.syncClass} onClick={this.sync}>Sync DB</span>
        <ul className="bb b--light-gray w-90 db center pb2" role="nav">
          <NavLink title="Home" path="/"/>
          <NavLink title="Fans" path="/fans"/>
          <NavLink title="Street Team" path="/streetteam"/>
          <NavLink title="Add Fan" path="/addfan"/>

        </ul>
        {this.props.children}
      </div>
    )
  }
})
