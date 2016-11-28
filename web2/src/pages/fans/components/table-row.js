const React = require('react')
const {style} = require('glamor')
const{Link} = require('react-router')

const tableRowStyle = style({
  borderBottom: '1px solid rgb(218, 218, 218)',
  height: 40
})




module.exports = ({state,city,fname,lname,email,id}) => {
  const addLink = text => <Link to={`/fans/${id}/show`}>{text}</Link>
  return (
    <tr {...tableRowStyle}>
      <td><Link to={`/fans/${id}/show`}>{state}</Link></td>
      <td><Link to={`/fans/${id}/show`}>{city}</Link></td>
      <td><Link to={`/fans/${id}/show`}>{fname}</Link></td>
      <td><Link to={`/fans/${id}/show`}>{lname}</Link></td>
      <td><Link to={`/fans/${id}/show`}>{email}</Link></td>
    </tr>
  )
}
