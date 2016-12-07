const React = require('react')
const {Match,BrowserRouter} = require('react-router')
const {style,insertRule,merge} = require('glamor')
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
import AddEvent from './pages/manage/add-event'
import AddDaySheet from './pages/manage/add-daysheet'
import Events from './pages/manage/events'
import Event from './pages/manage/show-event'
import DaySheet from './pages/manage/show-daysheet'




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

          <Match exactly pattern="/manage/daysheets/:id/edit" component={Service(AddDaySheet)}></Match>
          <Match exactly pattern="/manage/daysheets/:id/show" component={Service(DaySheet)}></Match>
          <Match exactly pattern="/manage/daysheets/add" component={Service(AddDaySheet)}></Match>

          <Match exactly pattern="/manage/events/add" component={Service(AddEvent)}></Match>
          <Match exactly pattern="/manage/events/:id/show" component={Service(Event)}></Match>
          <Match exactly pattern="/manage/events/:id/edit" component={Service(AddEvent)}></Match>

        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
