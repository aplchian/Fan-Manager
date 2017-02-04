const React = require('react')
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
  fansByState: ({bandID,sorttoken,limit,state}) =>
    axios.get(`${url}fans/state/${bandID}?state=${state}&limit=${limit}&sorttoken=${sorttoken}`),
  allFans: (artist,cb) => axios.get(`${url}fans?artist=${artist}`),
  streetTeam: (artist,cb) => axios.get(`${url}fans?artist=${artist}&streetteam=true`),
  syncMailChimp: (doc) => axios.post(`${url}mailchimp`,doc),
  listDateRange: C((type,{artistId,startdate,enddate}) =>
    axios.get(`${url}${type}/artists/${artistId}?startdate=${startdate}&enddate=${enddate}`)),
  add: C((type,doc) => axios.post(`${url}${type}`,doc)),
  list: C((type,id) => axios.get(`${url}${type}`)),
  get: C((type,id) => axios.get(`${url}${type}/${id}`)),
  update: C((type,doc) => axios.put(`${url}${type}`,doc)),
  destroy: C((type,id) => axios.delete(`${url}${type}/${id}`)),
  syncFans: () => axios.put(`${url}syncFans`),
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
      editFan={this.update('fans')}
      updateEvent={this.update('events')}
      updateDaySheet={this.update('events')}
      updateTodo={this.update('todos')}
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
      syncFans={this.syncFans}
    />
  }
})


module.exports = Service
