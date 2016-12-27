const React = require('react')
const {style} = require('glamor')

const logoBorder = style({
  display: 'block',
  margin: '0 auto 23px auto',
  height: '1px',
  width: '46px',
  backgroundColor: '#7A7A7A'
})

const logoStyle = style({
  display: 'block',
  margin: '25px auto 23px auto',
  height: '83px',
  width: '27px',
  'background': 'url("./images/logo.png") no-repeat center center',
  backgroundSize: '27px 83px'
})

module.exports = props => {
    return(
      <div>
        <div {...logoStyle}></div>
        <div {...logoBorder}></div>
      </div>
    )

}
