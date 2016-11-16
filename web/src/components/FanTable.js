const React = require('react')
const h = require('react-hyperscript')
const {
  Link
} = require('react-router')
const FanRow = require('./FanRow.js')
const {map} = require('ramda')

module.exports = props => {
  console.log(props)
  const tr = function(item){
    return <FanRow data={item.doc} key={item.id}/>
  }
  return <table>
    <tbody>
    <tr className="table-head">
      <th>State</th>
      <th>City</th>
      <th>Email</th>
      <th>First</th>
      <th>Last</th>
    </tr>
    {map(tr,props.data)}
    </tbody>
  </table>
}
