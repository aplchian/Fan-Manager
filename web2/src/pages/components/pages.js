const React = require('react')
const {style} = require('glamor')
const Logo = require('./logo')
const MenuItem = require('./menu-items.js')
const Header = require('./header')

const pageStyle = style({
  height: '100%',
  position: 'absolute',
  marginLeft: 120,
  width: 'calc(100% - 120px)',
  backgroundColor: '#f4f4f4'
})

const Page = React.createClass({
  render(){
    return(
      <div {...pageStyle}>
        {this.props.children}
      </div>
    )
  }
})

module.exports = Page
