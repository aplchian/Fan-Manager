const React = require('react')
import {style, select as $} from 'glamor'
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

const linkStyle = $('Link',{
  color: 'red'
})


const SubNav = React.createClass({
  getInitialState(){
    return {
      links: [
        {to: '/manage/todos', name: 'Todos'},
        {to: '/manage/events', name: 'Events'},
        {to: '/manage/daysheets', name: 'Day Sheets'}
      ]
    }
  },
  render(){
    const li = (item,i) => <NavItem eventKey={i} title={item.name}><Link className="sub-nav-item" to={item.to}>{item.name}</Link></NavItem>

    function handleSelect(selectedKey) {
    }
    return(
      <div>
        <div>
          <Nav bsStyle="pills" activeKey={9} onSelect={handleSelect}>
            {this.state.links.map(li)}
          </Nav>
          <Header header={this.props.title} />
        </div>
      </div>
    )
  }
})

module.exports = SubNav
