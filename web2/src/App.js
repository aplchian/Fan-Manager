const React = require('react')
const {Match,BrowserRouter} = require('react-router')
const {style,insertRule,merge} = require('glamor')
// const Fans = require('./pages/fans/')
const Home = require('./pages/home')
const FanDashBoard = require('./pages/fans/dashboard')
const AddFan = require('./pages/fans/add')
const FanSearch = require('./pages/fans/search')
const StreetTeam = require('./pages/fans/streetteam')





const appStyle = insertRule("body {height: 100%}")
const appStyle2 = insertRule("body {width: 100%}")

const App = React.createClass({
  render(){
    return(
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Home}></Match>
          <Match exactly pattern="/fans" component={FanDashBoard}></Match>
          <Match exactly pattern="/:type/fans" component={FanSearch}></Match>
          <Match exactly pattern="/fans/add" component={AddFan}></Match>
          <Match exactly pattern="/:type/fans" component={FanSearch}></Match>

        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
