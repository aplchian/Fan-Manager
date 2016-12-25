const moment = require('moment')
const {sort, compose, map} = require('ramda')
const {Link} = require('react-router')
import {Panel} from 'react-bootstrap'
var FontAwesome = require('react-fontawesome')
import React from 'react'

const sortAsc = compose(
  map(showResults),
  sort(asc)
)

const sortDesc = compose(
  map(showResults),
  sort(desc)
)

function strToMoment(x){
  return moment(x.date.split('T')[0])
}

function datetoUnix(x){
  return strToMoment(x).unix()
}

function asc(a,b){
 return datetoUnix(a) - datetoUnix(b)
}

function desc(a,b){
 return datetoUnix(b) - datetoUnix(a)
}

function showResults(item,i){
  let date = strToMoment(item).format('MMM DD')
  return <Link to={`/manage/daysheets/${item._id}/show`}><Panel className="daysheet-panel" key={i}><FontAwesome name='sun-o' /> {date}</Panel></Link>

}

function sortBy(order,results){
  return order === "asc" ? sortAsc(results) : sortDesc(results)
}

function sortIcon(order){
  return order === "asc"
          ? <FontAwesome className="sort-icon-asc daysheet-icon" name='sort-asc' />
          : <FontAwesome className="sort-icon daysheet-icon" name='sort-desc' />
}


 module.exports = {
  sortBy,
  sortIcon
 }
