
const React = require('react')
const xhrUrl = process.env.REACT_APP_XHR

const Xhr = Component => React.createClass({
  render(){
    return (
      <Component {...this.props} xhrUrl={xhrUrl} />
    )
  }
})


module.exports = Xhr
