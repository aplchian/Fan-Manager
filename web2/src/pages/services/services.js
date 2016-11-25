const React = require('react')
const xhr = require('xhr')

const Service = Component => React.createClass({
  allDocs(){

  },
  render(){
    return <Component
      allFans={this.addDocs}
    />
  }
})
