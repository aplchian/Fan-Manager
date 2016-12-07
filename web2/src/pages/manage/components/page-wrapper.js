const React = require('react')
const Home = require('../../home')
const SubNav = require('./sub-nav')
const {style} = require('glamor')
import {Row} from 'react-bootstrap'

const wrapperStyle = style({
  display: 'block',
  // margin: '50px auto 0 auto',
})

const backgroundStyle = style({
  // backgroundColor: '#f4f4f4'
})


const Dashboard = React.createClass({
  render(){
    return(
      <div {...backgroundStyle}>
        <Home>
          <SubNav title={this.props.title} />
          <Row {...wrapperStyle}>
            {this.props.children}
          </Row>
        </Home>
      </div>
   )
  }
})


module.exports = Dashboard
