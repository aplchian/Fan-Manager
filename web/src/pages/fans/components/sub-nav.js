const React = require('react')
const {style} = require('glamor')
const SubMenuItem = require('../../components/sub-menu-item')
import {Tab, Tabs, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router'
import Header from '../../components/header'
import { syncFans as sync } from '../../../services/'





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
  syncFans(e){
    e.preventDefault()
    sync()
      .then(res => this.setState({success: true}))
      .catch(err => console.log('ERROR',err))
  },
  render(){
    const li = (item,i) => <NavItem eventKey={i} title={item.name}><Link className="sub-nav-item" to={item.to}>{item.name}</Link></NavItem>

    const successStyle = this.state.success
                          ? style({
                              color: 'green'
                            })
                          : style({
                              color: 'inherit'
                            })

    const handleSelect = () => {}

    return(
      <div>
        <div>
          <Nav bsStyle="pills" activeKey={9} onSelect={handleSelect}>
            {this.state.links.map(li)}
            <NavItem> <a {...successStyle} className="sub-nav-item" onClick={this.syncFans}>Sync Fans</a> </NavItem>
          </Nav>
          <Header header={this.props.title} />
        </div>
      </div>
    )
  }
})

module.exports = SubNav
