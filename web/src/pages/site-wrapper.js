const React = require('react')
const Content = require('./components/content')
import { style, insertRule, merge } from 'glamor'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-dom'





const appStyle = insertRule("body {height: 100%}")
const appStyle2 = insertRule("body {width: 100%}")


const Home = React.createClass({
  getInitialState() {
    return ({
      showMenu: false
    })
  },
  toggleMenu(e) {
    this.setState({ showMenu: !this.state.showMenu })
  },
  redirect(path){
    return e => {
      this.props.history.push('/')
    }
  },
  render() {
    return (
      <div {...merge(appStyle, appStyle2) }>
        <Drawer
          docked={false}
          width={200}
          open={this.state.showMenu}
          onRequestChange={this.toggleMenu}
        >
          <List>
            <ListItem
              primaryText="Manage"
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Tasks"
                  onClick={this.redirect('/')}
                />,
                <ListItem
                  key={2}
                  primaryText="Events"
                />,
                <ListItem
                  key={3}
                  primaryText="Daysheets"
                />
              ]}
            />
            <ListItem primaryText="Fans" />
            <ListItem primaryText="Logout" onClick={this.props.logout} style={{ color: 'red' }} />
          </List>

        </Drawer>

        <AppBar
          title="inTouch"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={{ backgroundColor: 'black', fontFamily: 'AvenirNext-Heavy', fontSize: '14px', 'textTransform': 'uppercase' }}
          onLeftIconButtonTouchTap={this.toggleMenu}
        />
        <Content {...style({ maxWidth: '800px' }) }>
          {this.props.children}
        </Content>
      </div>
    )
  }
})

module.exports = Home
