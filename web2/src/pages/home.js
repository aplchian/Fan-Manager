const React = require('react')
const Sidebar = require('./components/aside')
const Content = require('./components/content')
const Header = require('./components/header')
import {style,insertRule,merge,css, select as $} from 'glamor'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router'
import MainNavBar from './components/main-nav'
import {map,tail,split,join} from 'ramda'
const axios = require('axios')
const url = process.env.REACT_APP_XHR


const Home = React.createClass({
  getInitialState(){
    return({
      bands: []
    })
  },
  componentDidMount(){
    console.log('authh',this.props.auth)
    this.props.auth.notify(profile => {
      this.props.setUser(profile)
    })
    if(!this.props.auth.loggedIn() && this.props.location.hash.indexOf('access_token') === -1){
      this.props.auth.login()
    }
    if(localStorage.getItem('profile')){
      let profile = JSON.parse(localStorage.getItem('profile'))
      axios.get(`${url}bands?userId=user_${profile.user_id}`)
        .then(res => {
          this.setState({
            bands: res.data[0].key[1]
          })
        })
    }
  },
  render(){
    const listBands = (item) => {
      console.log(item)
      return <Link to="/manage/todos"><div onClick={this.props.setBand(item)} className="select-artist">{join(" ",tail(split('_',item)))}</div></Link>
    }

    console.log('state',this.state)

    return(
      <div className="home-page">
        <div className="content-container" >
          <h1>intouch</h1>
          {map(listBands,this.state.bands)}
        </div>
      </div>
    )
  }
})

module.exports = Home
