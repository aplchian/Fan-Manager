const React = require('react')
const h = require('react-hyperscript')
const {
  Link
} = require('react-router')

module.exports = props => {
    return h('tr.bb.b--light-gray.w-90.db.center.pb2.pt2',{
      key: props.data.id
    },[
      h('td.mr5.fw5',[
        h(Link,{
          to: `/fan/${props.data.id}`,
        },props.data.doc.state)
      ]),
      h('td.fw2.pl5',props.data.doc.email),
    ])
}
