const React = require('react')
const {style} = require('glamor')

const titleStyle = style({
  textAlign: 'center',
  fontFamily: 'AvenirNext-Regular, sans-serif',
  color: '#4D4D4D',
  letterSpacing: '1.5',
  margin: 0,
  lineHeight: '66px',
  fontSize: '19px'
})


module.exports = props =>
  <h1 {...titleStyle}>{props.text}</h1>
