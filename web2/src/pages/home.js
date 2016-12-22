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
    // let fn = this.props.auth.notify(profile => {
    //   axios.get(`${url}bands?userId=user_${profile.user_id}`)
    //     .then(res => {
    //       this.props.setBands(res.data[0].key[1])
    //     })
    // })

    if(!this.props.auth.loggedIn() && this.props.location.hash.indexOf('access_token') === -1){
      this.props.auth.login(profile => {
        axios.get(`${url}bands?userId=user_${profile.user_id}`)
          .then(res => {
            this.props.setBands(res.data[0].key[1])
          })
      })
    }

    if(localStorage.getItem('profile')){
      let profile = JSON.parse(localStorage.getItem('profile'))
      this.props.setUser(profile)
      axios.get(`${url}bands?userId=user_${profile.user_id}`)
        .then(res => {
          this.setState({
            bands: res.data[0].key[1]
          })
        })
    }
  },
  updateBands(){
      let profile = JSON.parse(localStorage.getItem('profile'))
      this.props.setUser(profile)
      axios.get(`${url}bands?userId=user_${profile.user_id}`)
        .then(res => {
          this.setState({
            bands: res.data[0].key[1]
          })
        })
  },
  render(){
    console.log('props',this.props)
    const listBands = (item) => {
      return <Link to="/manage/todos"><div onClick={this.props.setBand(item)} className="select-artist">{join(" ",tail(split('_',item)))}</div></Link>
    }

    return(
      <div className="home-page">
        <div className="content-container" >
          <h1>intouch</h1>
          {
            this.state.bands.length > 0
            ? map(listBands,this.state.bands)
            : <div onClick={this.updateBands} className="refresh-bands">No Bands Found. Click here to try again!</div>
          }
        </div>
      </div>
    )
  }
})

module.exports = Home
