const React = require('react')
const {style} = require('glamor')

const headerStyle = style({
  fontFamily: 'Playfair Display, serif',
  fontSize: 20,
  color: '#4D4D4D',
  letterSpacing: '1.25px'
})

module.exports = ({text}) => <h1 {...headerStyle}>{text}</h1>
