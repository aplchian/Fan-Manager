import React from 'react'
const xhr = require('xhr')
const {
    map
} = require('ramda')
const {
  Router,
  Route,
  hashHistory,
  Link
} = require('react-router')
const h = require('react-hyperscript')
const serialize = require('form-serialize')
const {findDOMNode} = require('react-dom')


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
      url: "http://localhost:3039/fan",
      json: data
    },function(err,res){
      if(err){
        return console.log(err.message)
      }
      if(res){
        return console.log('Fan Created')
      }
    })
  },
  render: function(){
    return h('div',[
      h('h3.tc',"Add Fan"),
      h('form',[
        h('input.db.center.mt2',{
          placeholder: 'Email',
          ref: 'email'
        }),
        h('input.db.center.mt2',{
          placeholder: 'First Name',
          ref: 'fname'
        }),
        h('input.db.center.mt2',{
          placeholder: 'Last Name',
          ref: 'lname'
        }),
        h('input.db.center.mt2',{
          placeholder: 'City',
          ref: 'city'
        }),
        h('input.db.center.mt2',{
          placeholder: 'State(2dig)',
          ref: 'state'
        }),
        h('div.db.center.w-20',[
          h('input.dib.center.mt2#stcheck',{
            type: 'checkbox',
            ref: 'streetteam'
          }),
          h('label.dib.ml2',{
            htmlFor:"stcheck"
          },'Street Team'),
          h('button.db',{
            onClick: this.save
          },'Enter')
        ])
      ])
    ])
  }
})

module.exports = addFan
