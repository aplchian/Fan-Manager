const React = require('react')
const {Match,BrowserRouter} = require('react-router')
const {style,insertRule,merge} = require('glamor')
// const Fans = require('./pages/fans/')
const Home = require('./pages/home')
const FanDashBoard = require('./pages/fans/dashboard')
const AddFan = require('./pages/fans/add')
const EditFan = require('./pages/fans/add')
const ShowFan = require('./pages/fans/show')
const FanSearch = require('./pages/fans/search')
const StreetTeam = require('./pages/fans/streetteam')
const Service = require('./services/services')
import Manage from './pages/manage'
import DaySheets from './pages/manage/daysheets'
import Events from './pages/manage/events'



const appStyle = insertRule("body {height: 100%}")
const appStyle2 = insertRule("body {width: 100%}")

const App = React.createClass({
  render(){
    return(
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Home}></Match>
          <Match exactly pattern="/fans" component={Service(FanDashBoard)}></Match>
          <Match exactly pattern="/:type/fans" component={Service(FanSearch)}></Match>
          <Match exactly pattern="/fans/add" component={Service(AddFan)}></Match>
          <Match exactly pattern="/fans/:id/show" component={Service(ShowFan)}></Match>
          <Match exactly pattern="/fans/:id/edit" component={Service(AddFan)}></Match>

          <Match exactly pattern="/manage" component={Service(Manage)}></Match>
          <Match exactly pattern="/manage/events" component={Service(Events)}></Match>
          <Match exactly pattern="/manage/daysheets" component={Service(DaySheets)}></Match>


        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
