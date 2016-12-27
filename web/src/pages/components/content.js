const React = require('react')
const {style} = require('glamor')
const Logo = require('./logo')
const MenuItem = require('./menu-items.js')
const Header = require('./header')
import {Row,Grid} from 'react-bootstrap'

const pageStyle = style({
  height: '100%',
  backgroundColor: 'white'
})

const Content = React.createClass({
  render(){
    return(
      <Grid {...pageStyle}>
        {this.props.children}
      </Grid>
    )
  }
})

module.exports = Content
