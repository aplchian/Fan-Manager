const React = require('react')
const Sidebar = require('./components/aside')
const Content = require('./components/content')
const Header = require('./components/header')
import {style,insertRule,merge,css, select as $} from 'glamor'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router'
import MainNavBar from './components/main-nav'


const appStyle = insertRule("body {height: 100%}")
const appStyle2 = insertRule("body {width: 100%}")


const Home = React.createClass({
  render(){
    return(
      <div {...merge(appStyle,appStyle2)}>
        <MainNavBar user={this.props.user} logout={this.props.logout} />
        <Content {...style({maxWidth: '800px'})}>
          {this.props.children}
        </Content>
      </div>
    )
  }
})

module.exports = Home
