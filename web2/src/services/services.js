const React = require('react')
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
  updateEvent(doc){
    return axios.put(`${url}events`,doc)
  },
  updateDaySheet(doc){
    return axios.put(`${url}daysheets`,doc)
  },
  syncMailChimp(doc){
    return axios.post(`${url}mailchimp`,doc)
  },
  addEvent(doc){
    return axios.post(`${url}events`,doc)
  },
  addDaySheet(doc){
    return axios.post(`${url}daysheets`,doc)
  },
  getEvent(eventId){
    return axios.get(`${url}events/${eventId}`)
  },
  getDaySheet(id){
    return axios.get(`${url}daysheets/${id}`)
  },
  getEvents(){
    return axios.get(`${url}events`)
  },
  getDaySheets(){
    return axios.get(`${url}daysheets`)
  },
  removeEvent(id){
    return axios.delete(`${url}events/${id}`)
  },
  removeDaySheet(id){
    return axios.delete(`${url}daysheets/${id}`)
  },
  getArtistEvents({artistId,startdate,enddate}){
    return axios.get(`${url}events/artists/${artistId}?startdate=${startdate}&enddate=${enddate}`)
  },
  getArtistDaySheets({artistId,startdate,enddate}){
    return axios.get(`${url}events/artists/${artistId}?startdate=${startdate}&enddate=${enddate}`)
  },

  render(){
    return <Component
      {...this.props}
      fansByState={this.fansByState}
      allFans={this.allFans}
      streetTeam={this.streetTeam}
      addFan={this.addFan}
      addEvent={this.addEvent}
      getFan={this.getFan}
      getEvent={this.getEvent}
      editFan={this.editFan}
      updateEvent={this.updateEvent}
      updateDaySheet={this.updateDaySheet}
      getEvents={this.getEvents}
      getDaySheets={this.getDaySheets}
      getDaySheet={this.getDaySheet}
      syncMailChimp={this.syncMailChimp}
      addDaySheet={this.addDaySheet}
      removeEvent={this.removeEvent}
      removeDaySheet={this.removeDaySheet}
      getArtistEvents={this.getArtistEvents}
      getArtistDaySheets={this.getArtistDaySheets}
    />
  }
})

module.exports = Service
