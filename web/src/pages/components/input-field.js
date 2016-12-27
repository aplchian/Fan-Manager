const React = require('react')
const {style} = require('glamor')

const formStyle = style({
  width: '100%',
  height: '42px',
  display: 'block',
  margin: '0 auto 13px auto',
  border: '1px solid #D8D8D8',
  fontFamily: 'BebasNeueRegular',
  fontSize: '24px',
  color: '#4D4D4D',
  letterSpacing: '1.39px',
  paddingLeft: '15px',
})

module.exports = ({placeholder, value, onChange}) =>
  <input {...formStyle} placeholder={placeholder} value={value} onChange={onChange} type="text"/>
