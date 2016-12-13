import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {style, select as $} from 'glamor'
import React from 'react'
import {Link} from 'react-router'


const titleStyle = style({
  fontFamily: 'AvenirNext-Regular, sans-serif',
  fontSize: '15px',
  fontWeight: '500',
  color: '#4D4D4D',
  textTransform: 'uppercase',
})

const navLinks = $('& a',{
  fontSize: 12,
  color: '#4D4D4D',
  letterSpacing: '1.5',
  textTransform: 'uppercase',
  ':hover': {
    color: '#4D4D4D',
  }
})

const MainNavBar = () => (
  <Navbar {...style({marginBottom: '0px',color: 'red'})} collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand >
        <a {...titleStyle} href="#">Fan Manager</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav {...navLinks}>
        <NavItem eventKey={1}><Link to="/manage/todos">Manage</Link></NavItem>
        <NavItem eventKey={2}><Link to="/fans">Fans</Link></NavItem>
      </Nav>
      <Nav {...navLinks} pullRight>
        <NavItem eventKey={1} href="#">Aplchian</NavItem>
        {/* <NavItem eventKey={2} href="#">Link Right</NavItem> */}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default MainNavBar
