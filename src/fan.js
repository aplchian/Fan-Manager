const React = require('react')
const h = require('react-hyperscript')
const xhr = require('xhr')


var fanPage = React.createClass({
  getInitialState: function(){
    return ({
      data: []
    })
  },
  componentDidMount: function(){
    xhr({
        method: 'GET',
        url: `http://localhost:3039/fan/${this.props.params.id}`,
        json: true
    }, (err, res) => {
        if (err) {
            console.log(err.message)
        }
        if (res) {
          this.setState({
            data: res.body
          })
        }
    })
  },
  render: function(){
    return h('div.mt5',[
      h('h3.tc.fw2', `Email: ${this.state.data.email}`),
      h('h3.tc.fw2', `First Name: ${this.state.data.f_name}`),
      h('h3.tc.fw2', `Last Name: ${this.state.data.l_name}`),
      h('h3.tc.fw2', `City: ${this.state.data.city}`),
      h('h3.tc.fw2', `State: ${this.state.data.state}`),
      h('h3.tc.fw2', `Street Team: ${this.state.data.streetteam}`),
    ])
  }
})

module.exports = fanPage
