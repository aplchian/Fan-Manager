const React = require('react')
const {Match,HashRouter,Redirect} = require('react-router')
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
import AddTodo from './pages/manage/todo-form'
import AddDaySheet from './pages/manage/add-daysheet'
import Events from './pages/manage/events'
import Event from './pages/manage/show-event'
import DaySheet from './pages/manage/show-daysheet'
import Todos from './pages/manage/todos'


const auth = require('./utils/auth')(
  process.env.REACT_APP_ID,
  process.env.REACT_APP_DOMAIN
)


const App = React.createClass({
  getInitialState(){
    return ({
      user: null
    })
  },
  logOut(){
    this.setState({
      loggedOut: true
    })
  },
  setUser(user){
    this.setState({user})
  },
  setBand(band){
    return () => {
      this.setState({band})
    }
  },
  setBands(bands){
    console.log('bands',bands)
  },
  render(){
    return(
      <HashRouter>
          <div>
            <Match exactly pattern="/" render={props => <Home auth={auth} setBands={this.setBands} setBand={this.setBand} setUser={this.setUser} {...props} />} />
            <MatchWhenAuthorized exactly pattern="/fans" component={Service(FanDashBoard,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/:type/fans" component={Service(FanSearch,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/fans/add" component={Service(AddFan,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/fans/:id/show" component={Service(ShowFan,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/fans/:id/edit" component={Service(AddFan,this.logOut,this.state)}></MatchWhenAuthorized>

            <MatchWhenAuthorized exactly pattern="/manage" logout={this.logOut} component={Service(Manage,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/manage/events" component={Service(Events,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/manage/daysheets" logout={this.logOut} component={Service(DaySheets,this.logOut,this.state)}></MatchWhenAuthorized>

            <MatchWhenAuthorized exactly pattern="/manage/daysheets/:id/edit" component={Service(AddDaySheet,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/manage/daysheets/:id/show" component={Service(DaySheet,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/manage/daysheets/add" component={Service(AddDaySheet,this.logOut,this.state)}></MatchWhenAuthorized>

            <MatchWhenAuthorized exactly pattern="/manage/events/add" component={Service(AddEvent,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/manage/events/:id/show" component={Service(Event,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/manage/events/:id/edit" component={Service(AddEvent,this.logOut,this.state)}></MatchWhenAuthorized>

            <MatchWhenAuthorized exactly pattern="/manage/todos" component={Service(Todos,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/manage/todos/add" component={Service(AddTodo,this.logOut,this.state)}></MatchWhenAuthorized>
            <MatchWhenAuthorized exactly pattern="/manage/todos/:id/edit" component={Service(AddTodo,this.logOut,this.state)}></MatchWhenAuthorized>
          </div> 
      </HashRouter>
    )
  }
})

const MatchWhenAuthorized = ({component: Component, ...rest}) =>
  <Match {...rest} render={props => auth.loggedIn() ?
    <div>
       <Component {...props} />
     </div> : <Redirect to="/" />
  }
/>


module.exports = App
