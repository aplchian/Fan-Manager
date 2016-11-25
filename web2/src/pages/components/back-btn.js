const React = require('react')
const {style} = require('glamor')

const backBtn = style({
  background: 'url("./images/back-btn.png")',
  position: 'absolute',
  top: 26,
  left: 28,
  width: 11,
  height: 18,
  backgroundSize: '11px 18px'
})

module.exports = props => {
    const status = props.status === 'show' ? backBtn : {}
    console.log('status',status)
    return(
      <Link to={props.path} {...status}></Link>
    )
}
