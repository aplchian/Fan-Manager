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
  fansByState({bandID,sorttoken,limit,state}){
    return axios.get(`${url}fans/state/${bandID}?state=${state}&limit=${limit}&sorttoken=${sorttoken}`)
  },
  allFans(artist,cb){
    return axios.get(`${url}fans?artist=${artist}`)
  },
  streetTeam(artist,cb){
    return axios.get(`${url}fans?artist=${artist}&streetteam=true`)
  },
  addFan(doc,cb){
    return axios.post(`${url}fans`,doc)
  },
  getFan(fanId,cb){
    return axios.get(`${url}fans/${fanId}`)
  },
  editFan(doc,cb){
    return axios.put(`${url}fans`,doc)
  },
  updateEvent(doc){
    return axios.put(`${url}events`,doc)
  },
  updateDaySheet(doc){
    return axios.put(`${url}daysheets`,doc)
  },
  updateTodo(doc){
    return axios.put(`${url}todos`,doc)
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
  addTodo(doc){
    return axios.post(`${url}todos`,doc)
  },
  getEvent(eventId){
    return axios.get(`${url}events/${eventId}`)
  },
  getDaySheet(id){
    return axios.get(`${url}daysheets/${id}`)
  },
  getTodo(id){
    return axios.get(`${url}todos/${id}`)
  },
  getEvents(){
    return axios.get(`${url}events`)
  },
  getDaySheets(){
    return axios.get(`${url}daysheetsdsd`)
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
    return axios.get(`${url}daysheets/artists/${artistId}?startdate=${startdate}&enddate=${enddate}`)
  },
  getArtistTodos({artistId,startdate,enddate}){
    return axios.get(`${url}todos/artists/${artistId}?startdate=${startdate}&enddate=${enddate}`)
  },

  render(){
    return <Component
      {...this.props}
      fansByState={this.fansByState}
      allFans={this.allFans}
      streetTeam={this.streetTeam}
      addFan={this.addFan}
      addEvent={this.addEvent}
      addTodo={this.addTodo}
      getFan={this.getFan}
      getEvent={this.getEvent}
      getTodo={this.getTodo}
      editFan={this.editFan}
      updateEvent={this.updateEvent}
      updateDaySheet={this.updateDaySheet}
      updateTodo={this.updateTodo}
      getEvents={this.getEvents}
      getDaySheets={this.getDaySheets}
      getDaySheet={this.getDaySheet}
      syncMailChimp={this.syncMailChimp}
      addDaySheet={this.addDaySheet}
      removeEvent={this.removeEvent}
      removeDaySheet={this.removeDaySheet}
      getArtistEvents={this.getArtistEvents}
      getArtistDaySheets={this.getArtistDaySheets}
      getArtistTodos={this.getArtistTodos}
    />
  }
})

module.exports = Service
