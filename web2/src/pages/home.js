const React = require('react')
const Sidebar = require('./components/aside')
const Pages = require('./components/pages')
const Header = require('./components/header')
const {style,insertRule,merge} = require('glamor')


const appStyle = insertRule("body {height: 100%}")
const appStyle2 = insertRule("body {width: 100%}")


const Home = React.createClass({
  render(){
    return(
      <div {...merge(appStyle,appStyle2)}>
        <Sidebar />
        <Pages>
          <Header />
          {this.props.children}
        </Pages>
      </div>
    )
  }
})

module.exports = Home
