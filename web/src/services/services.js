const React = require('react')
const fetch = require('isomorphic-fetch')
const axios = require('axios')
const url = process.env.REACT_APP_XHR
const {pluck,map,curry: C} = require('ramda')
const auth = require('../utils/auth')(
  process.env.REACT_APP_ID,
  process.env.REACT_APP_DOMAIN
)

const Service = (Component,logOutUp,parentState,setBand) => React.createClass({
  getInitialState(){
    return({
      loggedIn: true
    })
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
  syncMailChimp(doc){
    return axios.post(`${url}mailchimp`,doc)
  },
  listDateRange: C((type,{artistId,startdate,enddate}) => {
    return axios.get(`${url}${type}/artists/${artistId}?startdate=${startdate}&enddate=${enddate}`)
  }),
  add: C((type,doc) => {
    return axios.post(`${url}${type}`,doc)
  }),
  list: C((type,id) => {
    return axios.get(`${url}${type}`)
  }),
  get: C((type,id) => {
    return axios.get(`${url}${type}/${id}`)
  }),
  update: C((type,doc) => {
    return axios.put(`${url}${type}`,doc)
  }),
  destroy: C((type,id) => {
      return axios.delete(`${url}${type}/${id}`)
  }),
  logOut(){
    auth.logout()
    logOutUp()
  },
  render(){
    return <Component
      {...this.props}
      fansByState={this.fansByState}
      allFans={this.allFans}
      streetTeam={this.streetTeam}
      addFan={this.add('fans')}
      addEvent={this.add('events')}
      addTodo={this.add('todos')}
      addDaySheet={this.add('daysheets')}
      getFan={this.get('fans')}
      getEvent={this.get('events')}
      getTodo={this.get('todos')}
      getBand={this.get('bands')}
      getDaySheet={this.get('daysheets')}
      getUser={this.get('events')}
      editFan={this.edit('fans')}
      updateEvent={this.edit('events')}
      updateDaySheet={this.edit('events')}
      updateTodo={this.edit('todos')}
      getEvents={this.list('events')}
      getDaySheets={this.list('daysheets')}
      removeFan={this.destroy('fans')}
      removeEvent={this.destroy('events')}
      removeDaySheet={this.destroy('daysheets')}
      removeTodo={this.destroy('todos')}
      getArtistEvents={this.listDateRange('events')}
      getArtistDaySheets={this.listDateRange('daysheets')}
      getArtistTodos={this.listDateRange('todos')}
      syncMailChimp={this.syncMailChimp}
      logOut={this.logOut}
      setBand={setBand}
      user={parentState.user}
      band={parentState.band}
    />
  }
})


module.exports = Service
