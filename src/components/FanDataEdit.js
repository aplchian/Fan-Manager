const React = require('react')
const h = require('react-hyperscript')
const {
  Link
} = require('react-router')

module.exports = props => {
  return(
    <div className="account-pair">
      <h4 className="account-label">{props.label}:</h4>
      <input type="text" onChange={props.change} value={props.data} />
    </div>
  )
}
