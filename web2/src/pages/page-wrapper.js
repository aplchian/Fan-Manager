const React = require('react')
const Home = require('./home')
const Pages = require('./components/pages')
const SubNav = require('./components/sub-nav')
const {style} = require('glamor')

const wrapperStyle = style({
  display: 'block',
  margin: '50px auto 0 auto',
  maxWidth: '700px',

})

const backgroundStyle = style({
  backgroundColor: '#f4f4f4'
})


const Dashboard = React.createClass({
  render(){
    return(
      <div {...backgroundStyle}>
        <Home>
          <SubNav />
          <div {...wrapperStyle}>
            {this.props.children}
          </div>
        </Home>
      </div>
   )
  }
})



module.exports = Dashboard
