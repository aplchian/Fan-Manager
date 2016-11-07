const React = require('react')
const h = require('react-hyperscript')
const xhr = require('xhr')
const {
  Link
} = require('react-router')

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
          return console.log('Fan Edited!')
        }
      })
    }
  },
  render: function(){
    console.log(this.state)
    return (
      h('div',[
        h('h3.tc',`Edit ${this.state.data.email}`),
        h('form',[
          h('input.db.center.mt2',{
            placeholder: 'Email',
            ref: 'email',
            type: "text",
            value: this.state.data.email,
            onChange: this.changeEmail
          }),
          h('input.db.center.mt2',{
            placeholder: 'First Name',
            ref: 'fname',
            type: "text",
            value: this.state.data.f_name,
            onChange: this.changeFName
          }),
          h('input.db.center.mt2',{
            placeholder: 'Last Name',
            ref: 'lname',
            type: "text",
            value: this.state.data.l_name,
            onChange: this.changeLName
          }),
          h('input.db.center.mt2',{
            placeholder: 'City',
            ref: 'city',
            type: "text",
            value: this.state.data.city,
            onChange: this.changeCity
          }),
          h('input.db.center.mt2',{
            placeholder: 'State(2dig)',
            ref: 'state',
            type: "text",
            value: this.state.data.state,
            onChange: this.changeState
          }),
          h('div.db.center.w-20',[
            h('input.dib.center.mt2#stcheck',{
              type: 'checkbox',
              ref: 'streetteam',
              checked: this.state.data.streetteam ? true : false,
              onChange: this.toggleStreetTeam
            }),
            h('label.dib.ml2',{
              htmlFor:"stcheck"
            },'Street Team'),
            h('button.db',{
              onClick: this.save
            },'Save')
          ])
        ])
      ])
    )
  }
})

module.exports = EditFan
