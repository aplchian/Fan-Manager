import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {style, select as $} from 'glamor'
import React from 'react'
import {Link} from 'react-router'
const auth = require('../../utils/auth')(
  process.env.REACT_APP_ID,
  process.env.REACT_APP_DOMAIN
)


const navLinks = $('& a',{
  fontSize: 12,
  color: '#4D4D4D',
  letterSpacing: '1.5',
  textTransform: 'uppercase',
  ':hover': {
    color: '#4D4D4D',
  }
})

const MainNavBar = React.createClass({
  getInitialState(){
    return({
      loggedIn: true,
      user: {
        profile: ''
      }
    })
  },
  componentDidMount(){
    if(localStorage.getItem('profile')){
      let profile = JSON.parse(localStorage.getItem('profile'))
      this.setState({
        user: profile
      })
    }
  },
  render(){

    const avatarStyle = style({
      background: `url(${this.state.user.picture}) no-repeat center center`,
      backgroundSize: 'cover',
      height: '33px',
      width: '33px',
      borderRadius: '100%',
      margin: '9px 10px 0 0'
    })

    console.log('checkstat',this.state)


    var avatar = this.state.user.profile === ''
      ? null
      : <NavItem {...avatarStyle}></NavItem>


    return(
      <Navbar {...style({marginBottom: '0px',color: 'red'})} collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand >
            <a className="site-title" href="#">intouch</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav {...navLinks}>
            <NavItem className="main-nav-item"  eventKey={1}><Link to="/manage/todos">Manage</Link></NavItem>
            <NavItem className="main-nav-item" eventKey={2}><Link to="/fans">Fans</Link></NavItem>
          </Nav>
          <Nav {...navLinks} pullRight>
            {avatar}
            <NavItem onClick={this.props.logout} eventKey={1} href="#">logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
})



export default MainNavBar
