const React = require('react')
const {style} = require('glamor')
const {Link} = require('react-router')



const liStyle = style({
  margin: '0 17px 0 0',
  fontFamily: 'BebasNeueBold',
  fontSize: 14,
  color: '#4D4D4D',
  letterSpacing: 0.81,
  display: 'inline-block'

})
const aStyle = style({
  color: '#D8D8D8',
  textDecoration: 'none',
  lineHeight: '34px',
  ":hover": {
    textDecoration: 'underline'
  }
})


const SMI = props =>
  <li {...liStyle}><Link {...aStyle} to={props.to}>{props.name}</Link></li>



module.exports = SMI
