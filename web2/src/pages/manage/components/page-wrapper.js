const React = require('react')
const Home = require('../../home')
const SubNav = require('./sub-nav')
import {style, select as $,merge,css} from 'glamor'
import {Row} from 'react-bootstrap'

const wrapperStyle = style({
  display: 'block',
  // margin: '50px auto 0 auto',
})

const backgroundStyle = style({
  // backgroundColor: '#f4f4f4'
})

const h3Style = css($('$ h3',{
  color: 'red'
}))


const Dashboard = React.createClass({
  render(){
    return(
      <div {...backgroundStyle}>
        <Home>
          <SubNav title={this.props.title} />
          <Row {...merge(wrapperStyle,h3Style)}>
            {this.props.children}
          </Row>
        </Home>
      </div>
   )
  }
})


module.exports = Dashboard
