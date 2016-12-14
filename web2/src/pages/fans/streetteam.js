const React = require('react')
const {style} = require('glamor')
const PageWrapper = require('./components/page-wrapper.js')



const Dashboard = React.createClass({
  render(){
    return(
      <div>
          <PageWrapper logout={this.props.logOut}>
            <h1>street team</h1>
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard
