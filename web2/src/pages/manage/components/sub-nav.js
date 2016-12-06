const React = require('react')
const {style} = require('glamor')
const SubMenuItem = require('../../components/sub-menu-item')
import {Tab, Tabs, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router'
import Header from '../../components/header'

const subNavStyle = style({
  width: '100%',
  height: 34,
  backgroundColor: 'white',
})

const ulStyle = style({
  margin: '0 auto',
  display: 'block',
  paddingLeft: 0,

})


const SubNav = React.createClass({
  getInitialState(){
    return {
      links: [
        {to: '/manage/events', name: 'Events'},
        {to: '/manage/daysheets', name: 'Day Sheets'}
      ]
    }
  },
  render(){
    const li = (item,i) => <NavItem eventKey={i} title={item.name}><Link to={item.to}>{item.name}</Link></NavItem>

    function handleSelect(selectedKey) {
      console.log(selectedKey);
    }
    return(
      <div>
        <Header header="Manage" />
        <div {...subNavStyle}>
          <Nav bsStyle="pills" activeKey={9} onSelect={handleSelect}>
            {this.state.links.map(li)}
          </Nav>
        </div>
      </div>
    )
  }
})

module.exports = SubNav