import React from 'react'
const h = require('react-hyperscript')
const xhr = require('xhr')
const FanTable = require('./components/FanTable.js')
module.exports = React.createClass({
  getInitialState: function(){
    return ({
      data: []
    })
  },
  componentDidMount: function(){
    xhr({
        method: 'GET',
        url: `http://localhost:3039/streetteam`,
        json: true
    }, (err, res) => {
        if (err) {
            console.log(err.message)
        }
        if (res) {
          this.setState({
            data: res.body
          })
        }
    })
  },
  render: function(){
    console.log(this.state)
    return (
      h('div',[
        h('h3.tc',"Street Team"),
        h(FanTable,{
          data: this.state.data
        })
      ])
    )
  }
})
