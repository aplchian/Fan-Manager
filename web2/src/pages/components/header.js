const React = require('react')
const {style} = require('glamor')
const {Link} = require('react-router')
const Logo = require('./logo')
const MenuItem = require('./menu-items.js')
const HeaderTitle = require('./page-title')
const HeaderSubTitle = require('./sub-title')
const BackBtn = require('./back-btn')


const headerStyle = style({
  height: 66,
  width: '100%',
  position: 'relative',
  backgroundColor: 'white'
})

const backBtn = style({
  background: 'url("./images/back-btn.png")',
  position: 'absolute',
  top: 26,
  left: 28,
  width: 11,
  height: 18,
  backgroundSize: '11px 18px'
})

const centerContainer = style({
  display: 'block',
  margin: '0 auto',
  borderBottom: '1px solid rgba(215,215,215,0.25)',
  position: 'relative'
})

const bandName = style({
  color: '#DB1819'
})


const Header = props =>
      <div {...headerStyle}>
        {/* <Link to="/" {...backBtn}></Link> */}
        <div {...centerContainer}>
          <HeaderTitle text={props.header} />
          {/* <HeaderSubTitle name="STOP LIGHT OBSERVATIONS" /> */}
        </div>
      </div>


module.exports = Header
