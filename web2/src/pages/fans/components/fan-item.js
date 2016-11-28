const React = require('react')
const {style} = require('glamor')

const titleStyle= style({
  fontFamily: 'WorkSans-Bold',
  fontSize: '10px',
  color: '#D8D8D8',
  letterSpacing: '0.69px',
  margin: 0
})

const dataStyle = style({
  fontFamily: 'WorkSans-Medium',
  fontSize: '18px',
  color: '#4D4D4D',
  letterSpacing: '-0.11px',
  margin: 0
})

const FanItem = ({label, data}) =>
  <div {...style({marginTop: '24px'})}>
    <h3 {...titleStyle}>{label}</h3>
    <h4 {...dataStyle}>{data}</h4>
  </div>


module.exports = FanItem
