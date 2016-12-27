const React = require('react')
const {style,merge} = require('glamor')
const RecentFan = require('./recent-fan')
const {Link} = require('react-router')

const labelStyle = style({
  fontFamily: 'BebasNeueRegular',
  fontSize: '14px',
  color: '#4D4D4D',
  letterSpacing: 0.81
})

const moreStyle = style({
  fontFamily: 'BebasNeueRegular',
  fontSize: 10,
  color: '#4D4D4D',
  letterSpacing: 0.58,
  position: 'absolute',
  bottom: 0,
  right: 17
})



const Recent = React.createClass({
  render(){
    return(
      <div>
        <h1 {...labelStyle}>Recent</h1>
        <RecentFan></RecentFan>
        <RecentFan></RecentFan>
        <RecentFan></RecentFan>
        <RecentFan></RecentFan>
        <RecentFan></RecentFan>
        <RecentFan></RecentFan>
        <RecentFan></RecentFan>
        <Link to="/" {...moreStyle}>See All</Link>
      </div>
    )
  }
})

module.exports = Recent
