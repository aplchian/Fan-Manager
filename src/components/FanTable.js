const React = require('react')
const h = require('react-hyperscript')
const {
  Link
} = require('react-router')
const FanRow = require('./FanRow.js')
const {map} = require('ramda')

module.exports = props => {
  const li = function(item){
    return h(FanRow,{
      data: item
    })
  }
  return h("table.center.db.w50",[
    h('tr.bb.b--light-gray.w-90.db.center.pb2.pt2',[
      h('th','State'),
      h('th.right-3.relative','Email')
    ]),
    map(li,props.data)
  ])
}
