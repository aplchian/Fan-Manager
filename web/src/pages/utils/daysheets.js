const moment = require('moment')
const { sort, compose, map, curry, identity } = require('ramda')
const { Link } = require('react-router')
import { Panel, Checkbox, FormControl, Button } from 'react-bootstrap'
var FontAwesome = require('react-fontawesome')
const { Maybe } = require('ramda-fantasy')
import React from 'react'

const sortAsc = compose(
  map(showResults),
  sort(asc)
)

const sortDesc = compose(
  map(showResults),
  sort(desc)
)

function strToMoment(x) {
  return moment(x.date.split('T')[0])
}

function datetoUnix(x) {
  return strToMoment(x).unix()
}

function asc(a, b) {
  return datetoUnix(a) - datetoUnix(b)
}

function desc(a, b) {
  return datetoUnix(b) - datetoUnix(a)
}

function showResults(item, i) {
  let date = strToMoment(item).format('MMM DD')
  return <Link to={`/manage/daysheets/${item._id}/show`}><Panel className="daysheet-panel" key={i}><FontAwesome name='sun-o' /> {date}</Panel></Link>

}

function sortBy(order, results) {
  return order === "asc" ? sortAsc(results) : sortDesc(results)
}

function sortIcon(order) {
  return order === "asc"
    ? <FontAwesome className="sort-icon-asc daysheet-icon" name='sort-asc' />
    : <FontAwesome className="sort-icon daysheet-icon" name='sort-desc' />
}

//// daysheet form

const listEvents = curry(function (fn, item) {
  return item.status === 'confirmed'
    ? <Checkbox key={item.id} checked onChange={fn(item.id)}>{item.name}</Checkbox>
    : <Checkbox key={item.id} onChange={fn(item.id)}>{item.name}</Checkbox>
})

const getName = ({ event }) => Maybe(event).map(identity)

const showEvents = curry((fn, item) => (
  <FormControl.Static className="form-item-container">
    <span className="form-item-title">
      {`${getName(item).getOrElse('Unnamed')} - ${moment(item.starttime, 'HH:mm').format('h:mm a')}`}
    </span>
    <Button className="pull-right remove-btn" onClick={fn(item.id)}>remove</Button>
  </FormControl.Static>
))

module.exports = {
    sortBy,
    sortIcon,
    listEvents,
    showEvents
  }
