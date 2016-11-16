import React from 'react'
const xhr = require('xhr')
const {
    map
} = require('ramda')
const {
  browserHistory
} = require('react-router')
const {findDOMNode} = require('react-dom')
const Xhr = require('./Xhr')


const addFan = React.createClass({
  getInitialState: function(){
    return ({})
  },
  save: function(e){
    e.preventDefault()
    var data = {
      email: findDOMNode(this.refs.email).value,
      f_name: findDOMNode(this.refs.fname).value,
      l_name: findDOMNode(this.refs.lname).value,
      state: findDOMNode(this.refs.state).value,
      city: findDOMNode(this.refs.city).value,
      streetteam: findDOMNode(this.refs.streetteam).checked,
    }
    console.log(data)
    xhr({
      method: "POST",
      url: `${this.props.xhrUrl}/fan`,
      json: data
    },function(err,res){
      if(err){
        return console.log(err.message)
      }
      if(res){
        browserHistory.push(`/fan/${res.body.id}`)
        return console.log('Fan Created')
      }
    })
  },
  render: function(){
    return <div className="container edit-container">
        <div className="header-container">
          <h1>Add New</h1>
        </div>
        <div className="account-pair">
          <h4 className="account-label">email:*</h4>
          <input type="text" ref='email'/>
        </div>
        <div className="account-pair">
          <h4 className="account-label">first name:</h4>
          <input type="text" ref='fname'/>
        </div>
        <div className="account-pair">
          <h4 className="account-label">last name:</h4>
          <input type="text" ref='lname'/>
        </div>
        <div className="account-pair">
          <h4 className="account-label">city:</h4>
          <input type="text" ref='city'/>
        </div>
        <div className="account-pair">
          <h4 className="account-label">state:*</h4>
          <input type="text" ref='state'/>
        </div>
        <label htmlFor="stcheck">street team:</label>
        <input type="checkbox" ref="streetteam"/>
        <button className="save-btn" onClick={this.save}>Save</button>
      </div>
  }
})

module.exports = Xhr(addFan)
