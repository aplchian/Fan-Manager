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
        {to: '/search/fans', name: 'Search'},
        {to: '/streetteam/fans', name: 'Street Team'},
        {to: '/fans/add', name: 'Add Fan'}
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
