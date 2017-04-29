const React = require('react')
const Home = require('../../home')
const SubNav = require('./sub-nav')
import {style, select as $,merge,css} from 'glamor'
import {Row} from 'react-bootstrap'
import SiteWrapper from '../../site-wrapper'

const wrapperStyle = style({
  display: 'block',
  maxWidth: '800px'
  // margin: '50px auto 0 auto',
})


const h3Style = css($('$ h3',{
  color: 'red'
}))

const Dashboard = React.createClass({
  getInitialState(){
    return({
      user: this.props.user
    })
  },
  render(){
    console.log('props',this.props)
    return(
        <SiteWrapper redirect={this.props.redirect} user={this.props.user} logout={this.props.logout}>
          <SubNav title={this.props.title} />
          <Row {...merge(wrapperStyle,h3Style)}>
            {this.props.children}
          </Row>
        </SiteWrapper>
   )
  }
})


module.exports = Dashboard
