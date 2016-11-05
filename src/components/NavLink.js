import React, { Component } from 'react';
const {
  Router,
  Route,
  hashHistory,
  Link
} = require('react-router')
const h = require('react-hyperscript')


module.exports = props => {
  return h('li.dib.mr2.link',[
    h(Link,{
      to: props.path
    },props.title)
  ]
  )
}
