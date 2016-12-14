const React = require('react')
const SiteWrapper = require('../../site-wrapper')
const SubNav = require('./sub-nav')
const {style} = require('glamor')
import {Row} from 'react-bootstrap'

const wrapperStyle = style({
  display: 'block',
  margin: '50px auto 0 auto',
})

const Dashboard = React.createClass({
  render(){
    return(
        <SiteWrapper logout={this.props.logout}>
          <SubNav title={this.props.title} />
          <Row {...wrapperStyle}>
            {this.props.children}
          </Row>
        </SiteWrapper>
   )
  }
})


module.exports = Dashboard
