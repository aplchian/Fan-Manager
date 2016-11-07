const React = require('react')
const h = require('react-hyperscript')
const {
  Link
} = require('react-router')

module.exports = props => {
  return(
    <div className="account-pair">
      <h4 className="account-label">{props.label}:</h4>
      <h4 className="account-data">{props.data}</h4>
    </div>
  )
}
