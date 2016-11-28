const React = require('react')
const {style} = require('glamor')

const buttonStyle = style({
  fontFamily: 'BebasNeueRegular',
  fontSize: '24px',
  color: '#7A7A7A',
  letterSpacing: '1.39px',
  border: '1px solid #7A7A7A',
  height: '42px',
  width: '115px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  float: 'right'
})

module.exports = ({text, onClick}) =>
  <button {...buttonStyle} onClick={onClick}>{text}</button>
