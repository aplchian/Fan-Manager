const React = require('react')
const {style} = require('glamor')

const containerStyle = style({
  width: 700,
  display: 'block',
  margin: '30px auto 0 auto'
})

const PageContainer = props =>
  <div {...containerStyle}>{props.children}</div>

module.exports = PageContainer
