const React = require('react')
const {style} = require('glamor')

const nameStyle = style({
  position: 'absolute',
  right: 9,
  bottom: 6,
  fontFamily: 'BebasNeueRegular',
  fontWeight: 300,
  fontSize: 15,
  color: '#D8D8D8',
  letterSpacing: 0.87,
  margin: 0,
})



module.exports = props =>
  <h3 {...nameStyle}>{props.name}</h3>
