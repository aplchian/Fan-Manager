import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import {Button,FormControl,FieldGroup,FormGroup,Form,Table} from 'react-bootstrap'
const TableRow = require('./table-row.js')


const SearchResultsTable = ({results}) => {
  const tableHeader = results.length > 0
    ? <thead><tr><th>state</th><th>city</th><th>first</th><th>last</th><th>email</th></tr></thead>
    : null
  const row = (item, i) => (
    <TableRow
      key={i}
      state={item.state}
      city={item.city}
      fname={item.f_name}
      lname={item.l_name}
      email={item.email}
      id={item._id}
    />
  )
  return (
      <Table responsive striped bordered condensed hover >
        {tableHeader}
        <tbody>
        {results.map(row)}
        </tbody>
      </Table>
  )
}

export default SearchResultsTable
