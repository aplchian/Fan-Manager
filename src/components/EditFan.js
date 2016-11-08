const React = require('react')
const h = require('react-hyperscript')
const xhr = require('xhr')
const {
  Link,
  browserHistory
} = require('react-router')
const FanDataEdit = require('./FanDataEdit.js')


var EditFan = React.createClass({
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
  changeEmail: function(e){
    var email = e.target.value
    var data = this.state.data
    data.email = email
    data._id = `${this.state.data.state}_${email}`
    this.setState({
      data: data
    })
  },
  changeFName: function(e){
    var fName = e.target.value
    var data = this.state.data
    data.f_name = fName
    this.setState({
      data: data
    })
  },
  changeLName: function(e){
    var lName = e.target.value
    var data = this.state.data
    data.l_name = lName
    this.setState({
      data: data
    })
  },
  changeCity: function(e){
    var city = e.target.value
    var data = this.state.data
    data.city = city
    this.setState({
      data: data
    })
  },
  changeState: function(e){
    var state = e.target.value
    var data = this.state.data
    data._id = `${state}_${this.state.data.email}`
    data.state = state
    this.setState({
      data: data
    })
  },
  toggleStreetTeam: function(e){
    var streetteam = e.target.checked
    var data = this.state.data
    data.streetteam = streetteam
    this.setState({
      data: data
    })
  },
  save: function(e){
    e.preventDefault()
    if (this.props.params.id !== this.state.data._id){
      xhr({
          method: 'DELETE',
          url: `http://localhost:3039/fan/${this.props.params.id}`,
      }, (err, res) => {
          if (err) {
              console.log(err.message)
          }
          if (res) {
            var data = this.state.data
            delete data._rev
            delete data._id
            xhr({
              method: "POST",
              url: "http://localhost:3039/fan",
              json: data
            },function(err,res){
              if(err){
                return console.log(err.message)
              }
              if(res){
                console.log(res)
                browserHistory.push(`/fan/${res.body.id}`)
                return console.log('Fan Edited!')
              }
            })
          }
      })
    }else{
      xhr({
        method: "PUT",
        url: "http://localhost:3039/fan",
        json: this.state.data
      },function(err,res){
        if(err){
          return console.log(err.message)
        }
        if(res){
          browserHistory.push(`/fan/${res.body.id}`)
        }
      })
    }
  },
  render: function(){
    return (
      <div className="container edit-container">
        <div className="header-container">
          <h1>{this.state.data.email}</h1>
        </div>
        <FanDataEdit label='email' change={this.changeEmail} data={this.state.data.email}/>
        <FanDataEdit label='first name' change={this.changeFName} data={this.state.data.f_name}/>
        <FanDataEdit label='last name' change={this.changeLName} data={this.state.data.l_name}/>
        <FanDataEdit label='city' change={this.changeCity} data={this.state.data.city}/>
        <FanDataEdit label='state' change={this.changeState} data={this.state.data.state}/>
        <label htmlFor="stcheck">street team:</label>
        <input type="checkbox" onChange={this.toggleStreetTeam} checked={this.state.data.streetteam ? true : false}/>
        <button className="save-btn" onClick={this.save}>Save</button>
      </div>
    )
  }
})



module.exports = EditFan
