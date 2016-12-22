import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel} from 'react-bootstrap'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
import {Link} from 'react-router'
const db = new PouchDB('slo-dev')
import {filter, pluck,sort,map} from 'ramda'
import moment from 'moment'
import DatePicker from 'react-datepicker'
var FontAwesome = require('react-fontawesome')



const sortIcon = this.state.order === 'asc'
  ? <FontAwesome {...style({position: 'relative', left: '4px'})} className="sort-icon-asc" name='sort-asc' />
  : <FontAwesome {...style({position: 'relative', left: '4px'})} className="sort-icon" name='sort-desc' />

const results = (item,i) => {
  let date = moment(item.date.split('T')[0]).format('MMM DD')
  return <Link to={`/manage/daysheets/${item._id}/show`}><Panel className="daysheet-panel" key={i}><FontAwesome name='sun-o' /> {date}</Panel></Link>
}

//sorts by comparing two dates unix
const asc = (a, b) => { return moment(a.date.split('T')[0]).unix() - moment(b.date.split('T')[0]).unix() }
const desc = (a, b) => { return moment(b.date.split('T')[0]).unix() - moment(a.date.split('T')[0]).unix() }

const resultsList = this.state.order === 'asc'
  ? map(results,sort(asc,this.state.results))
  : map(results,sort(desc,this.state.results))

module.exports = {
  sortIcon,
  results,
  asc,
  desc,
  resultsList
}
