const React = require('react')
const Widget = require('./components/widget')
const {style} = require('glamor')
const States = require('./components/states')
const Recent = require('./components/recent')
const PageWrapper = require('../page-wrapper.js')

const clearFloat = style({
  clear: 'both'
})

const Dashboard = React.createClass({
  render(){
    return(
      <div>
          <PageWrapper>
            <Widget float="left">
              <States />
            </Widget>
            <Widget float="right">
              <Recent />
            </Widget>
            <div {...clearFloat}></div>
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard
