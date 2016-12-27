const React = require('react')
const {style} = require('glamor')
const {Link} = require('react-router')

const logoBorder = style({
  display: 'block',
  height: '33px',
  width: '100%',
  fontFamily: 'BebasNeueRegular',
  fontSize: '18px',
  color: '#7A7A7A',
  letterSpacing: '1.04px',
  textAlign: 'center',
  lineHeight: '33px',
  textDecoration: 'none',
  ':hover': {
    backgroundColor: '#7A7A7A',
    'color': '#D8D8D8'
  }
})

module.exports = props =>
  <Link to={props.path} {...logoBorder}>{props.name}</Link>
