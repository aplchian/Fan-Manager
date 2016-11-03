import React, { Component } from 'react';
const {
  Router,
  Route,
  hashHistory,
  Link
} = require('react-router')
const PouchDB = require('pouchdb')
const db = new PouchDB('http://localhost:5984/slo/')
const syncDB = require('./helpers/syncDB.js')



const h = require('react-hyperscript')
const Home = require('./home.js')



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
          <li className="dib mr2 no-underline" ><Link to="/">Home</Link></li>
          <li className="dib mr2 no-underline" ><Link to="/fans">Fans</Link></li>
          <li className="dib mr2 no-underline" ><Link to="/streetteam">Street Team</Link></li>

        </ul>
        {this.props.children}
      </div>
    )
  }
})
