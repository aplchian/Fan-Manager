const React = require('react')
const {style} = require('glamor')

const tableRowStyle = style({
  borderBottom: '1px solid rgb(218, 218, 218)',
  height: 40
})


module.exports = props =>
  <tr {...tableRowStyle}>
    <td>{props.state}</td>
    <td>{props.city}</td>
    <td>{props.fname}</td>
    <td>{props.lname}</td>
    <td>{props.email}</td>
  </tr>
