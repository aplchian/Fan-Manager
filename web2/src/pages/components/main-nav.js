import {Navbar, Nav, NavItem} from 'react-bootstrap'
import React from 'react'
import {Link} from 'react-router'


const MainNavBar = () => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Fan Manager</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1}><Link to="/manage">Manage</Link></NavItem>
        <NavItem eventKey={2}><Link to="/fans">Fans</Link></NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">Aplchian</NavItem>
        {/* <NavItem eventKey={2} href="#">Link Right</NavItem> */}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default MainNavBar
