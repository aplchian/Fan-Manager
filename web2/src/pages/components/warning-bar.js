const React = require('react')
const {style} = require('glamor')

const warningStyle = style({
  width: '218px',
  height: '42px',
  color: 'white',
  backgroundColor: 'red',
  fontFamily: 'BebasNeueRegular',
  fontSize: '18px',
  color: '#FFFFFF',
  letterSpacing: '1.04px',
  textAlign: 'center',
  lineHeight: '42px',
  display: 'block',
  margin: '0 auto 21px auto',
})

module.exports = props =>
  <div {...warningStyle}>{props.text}</div>
