import React from 'react'
import {Button,FormControl,FieldGroup,FormGroup,Form,Table} from 'react-bootstrap'



const FanSearchBar = ({handleSubmit,handleChange,q}) => (
  <Form onSubmit={handleSubmit}>
    <label>Search By</label>
    <FormControl className="sidebar-select" componentClass="select" placeholder="select" onChange={handleChange('searchtype')}>
     <option value="email">Email</option>
     <option value="state">State</option>
     <option value="city">City</option>
     <option value="l_name">Last Name</option>
   </FormControl>
    <FormGroup>
      <label>Search</label>
      <FormControl
        className="sidebar-select"
        type="text"
        label="Search"
        placeholder="Search"
        value={q}
        onChange={handleChange('q')} />
    </FormGroup>
    <Button type="submit">Search</Button>
  </Form>
)


export default FanSearchBar
