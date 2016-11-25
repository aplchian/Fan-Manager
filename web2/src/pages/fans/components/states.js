const React = require('react')
const {style} = require('glamor')


const labelStyle = style({
  fontFamily: 'BebasNeueRegular',
  fontSize: '14px',
  color: '#4D4D4D',
  letterSpacing: 0.81
})

const States = React.createClass({
  render(){
    return(
      <div>
        <h1 {...labelStyle} className="label">Top States</h1>
        <h1>states body</h1>
      </div>
    )
  }
})

module.exports = States
