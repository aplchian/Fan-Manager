const React = require('react')
const h = require('react-hyperscript')
const xhr = require('xhr')
const {
  Link
} = require('react-router')
const FanData = require('../../components/FanData')
const Xhr = require('../../components/Xhr')


var fanPage = React.createClass({
  getInitialState: function(){
    return ({
      data: []
    })
  },
  componentDidMount: function(){
    xhr({
        method: 'GET',
        url: `${this.props.xhrUrl}/fan/${this.props.params.id}`,
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
  removeFan: function(e){
    e.preventDefault()
    console.log(this.state)
    xhr({
        method: 'DELETE',
        url: `${this.props.xhrUrl}/fan/${this.state.data._id}`,
    }, (err, res) => {
        if (err) {
            console.log(err.message)
        }
        if (res) {
          console.log('Fan Deleted!',res)
          this.setState({
            deleted: true
          })
        }
    })
  },
  render: function(){
    var prompt
    if(this.state.deleted){
      prompt = <div className="modal-bg">
        <div className="modal-container">
          <Link to="/fans">
            <div className="modal-exit"></div>
          </Link>
          <h2>Fan Deleted!</h2>
        </div>
      </div>
    }
    return <div className="container">
      <div className="header-container">
        <h1>{this.state.data.email}</h1>
      </div>
      <FanData label='email' data={this.state.data.email}/>
      <FanData label='first name' data={this.state.data.f_name}/>
      <FanData label='last name' data={this.state.data.l_name}/>
      <FanData label='city' data={this.state.data.city}/>
      <FanData label='state' data={this.state.data.state}/>
      <div className="account-pair">
        <h4 className="account-label">street team:</h4>
        <h4 className="account-data">{this.state.data.streetteam === true ? 'Yes' : 'No'}</h4>
      </div>
      <Link to={`/fan/edit/${this.state.data._id}`}>
        <button className="edit-btn">Edit</button>
      </Link>
      <button onClick={this.removeFan} className="delete-btn">Delete Fan</button>
      {prompt}
    </div>
  }
})


module.exports = Xhr(fanPage)
