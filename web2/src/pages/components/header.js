const React = require('react')
const {style} = require('glamor')
const {Link} = require('react-router')
const Logo = require('./logo')
const MenuItem = require('./menu-items.js')
const HeaderTitle = require('./page-title')
const HeaderSubTitle = require('./sub-title')
const BackBtn = require('./back-btn')



const bandName = style({
  color: '#DB1819'
})


const Header = props => <HeaderTitle text={props.header} />




module.exports = Header
