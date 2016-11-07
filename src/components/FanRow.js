const React = require('react')
const h = require('react-hyperscript')
const {
  Link
} = require('react-router')

module.exports = props => {
    return <tr>
      <td><Link to={`/fan/${props.data._id}`}>{props.data.state}</Link></td>
      <td><Link to={`/fan/${props.data._id}`}>{props.data.city}</Link></td>
      <td><Link to={`/fan/${props.data._id}`}>{props.data.email}</Link></td>
      <td><Link to={`/fan/${props.data._id}`}>{props.data.f_name}</Link></td>
      <td><Link to={`/fan/${props.data._id}`}>{props.data.l_name}</Link></td>
    </tr>
}
