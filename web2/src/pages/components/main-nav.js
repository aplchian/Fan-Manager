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
      loggedIn: true
    })
  },
  render(){
    console.log('')
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
            <NavItem onClick={this.props.logout} eventKey={1} href="#">logout</NavItem>
            {/* <NavItem eventKey={2} href="#">Link Right</NavItem> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
})



export default MainNavBar
