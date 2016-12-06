const React = require('react')
const xhr = require('xhr')
const fetch = require('isomorphic-fetch')
const axios = require('axios')
const url = process.env.REACT_APP_XHR
const {pluck,map} = require('ramda')

const Service = Component => React.createClass({
  tap(item){
    console.log(item)
    return item
  },
  fansByState(state,cb){
    axios.get(`${url}fans/state/${state}`)
      .then(res => map(item => item.doc,res.rows))
      .then(res => cb(null,res))
      .catch(err => cb(err))
  },
  allFans(cb){
    axios.get(`${url}fans`)
      .then(res => map(item => item.doc,res.data))
      .then(res => cb(null,res))
      .catch(err => cb(err))
  },
  streetTeam(cb){
    axios.get(`${url}streetteam`)
      .then(res => map(item => item.doc,res.data))
      .then(res => cb(null,res))
      .catch(err => cb(err))
  },
  addFan(doc,cb){
    axios.post(`${url}fans`,doc)
      .then(res => cb(null,res))
      .catch(err => cb(err))
  },
  getFan(fanId,cb){
    axios.get(`${url}fans/${fanId}`)
      .then(res => cb(null,res.data))
      .catch(err => cb(err))
  },
  editFan(doc,cb){
    axios.put(`${url}fans`,doc)
      .then(res => cb(null,res))
      .catch(err => cb(err))
  },
  syncMailChimp(doc){
    return axios.post(`${url}mailchimp`,doc)
  },
  render(){
    return <Component
      {...this.props}
      fansByState={this.fansByState}
      allFans={this.allFans}
      streetTeam={this.streetTeam}
      addFan={this.addFan}
      getFan={this.getFan}
      editFan={this.editFan}
      syncMailChimp={this.syncMailChimp}
    />
  }
})

module.exports = Service
