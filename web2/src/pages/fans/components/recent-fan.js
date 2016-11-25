const React = require('react')
const {style,merge} = require('glamor')


const containerStyle = style({
  height: 38,
  width: 307,
  display: 'block',
  margin: '0 auto',
  position: 'relative',
  borderBottom: '1px solid rgb(238, 238, 238)'
})

const subTextStyle = style({
  fontFamily: 'BebasNeueRegular',
  fontSize: 9,
  color: '#7A7A7A',
  letterSpacing: 0.52,
  margin: 0
})

const dateStyle = style({
  position: 'absolute',
  top: 7,
  right: 0
})
const emailStyle = style({
  position: 'absolute',
  top: 18,
  right: 0
})

const locationStyle = style({
  fontFamily: 'BebasNeueRegular',
  fontSize: 15,
  color: '#7A7A7A',
  letterSpacing: 0.87,
  margin: 0,
  lineHeight: '38px',
})

const RecentFan = React.createClass({
  render(){
    return(
      <div {...containerStyle}>
        <h3 {...locationStyle}>Charleston, SC</h3>
        <h4 {...merge(dateStyle,subTextStyle)}>9/12</h4>
        <h4 {...merge(emailStyle,subTextStyle)}>alex@aplchianmedia.com</h4>
        <div></div>
      </div>
    )
  }
})

module.exports = RecentFan
