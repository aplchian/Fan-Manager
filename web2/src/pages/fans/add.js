const React = require('react')
const {style} = require('glamor')
const PageWrapper = require('./components/page-wrapper.js')
const Input = require('../components/input-field')
const WarningBar = require('../components/warning-bar')
const Button = require('../components/submit-button.js')
const PageTitle = require('../components/page-header.js')
// import {Button,Modal} from 'react-bootstrap'

const checkboxContainer = style({
  display: 'block',
  margin: '0 auto',
  width: '100%',
  height: 30
})

const checkboxStyle = style({
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%,0)'
})

const containerStyle = style({
  width: '50%',
  display: 'block',
  margin: '0 auto',
})



const Dashboard = React.createClass({
  getInitialState(){
    return({
      f_name: '',
      l_name: '',
      email: '',
      state: '',
      city: '',
      streetteam: false,
      success: 'email is required'
    })
  },
  componentDidMount(){
    if(this.props.params.id){
      this.props.getFan(this.props.params.id, (err,res) => {
        this.setState(res)
      })
    }
  },
  handleChange(path){
    return e => {
      let current = this.state
      current[path] = e.target.value
      this.setState(current)
    }
  },
  handleSubmit(e){
    e.preventDefault()
    if(this.state._id){
      this.props.editFan(this.state,(err,res) => {
        if(err) return console.log('err',err)
        return console.log('success',res)
      })
    }else {
      this.props.addFan(this.state,(err,res) => {
        if(err) return console.log('err',err)
        return console.log('success',res)
      })
    }
  },
  toggleStreetTeam(e){
    this.setState({
      streetteam: !this.state.streetteam
    })
  },
  render(){
    console.log(this.state)
    return(
      <div>
          <PageWrapper>
            <div {...containerStyle}>
              <PageTitle text="Add Fan"/>
              {/* <WarningBar text={this.state.success}/> */}
              <form onSubmit={this.handleSubmit}>
                <Input placeholder="First" value={this.state.f_name} onChange={this.handleChange('f_name')} />
                <Input placeholder="Last" value={this.state.l_name} onChange={this.handleChange('l_name')} />
                <Input placeholder="Email" value={this.state.email} onChange={this.handleChange('email')} />
                <Input placeholder="City" value={this.state.city} onChange={this.handleChange('city')} />
                <Input placeholder="State" value={this.state.state} onChange={this.handleChange('state')} />
                <div {...checkboxContainer}>
                  <div {...checkboxStyle}>
                    <label>Street Team</label>
                    <input type="checkbox" checked={this.state.streetteam} onChange={this.toggleStreetTeam} />
                  </div>
                </div>
                <Button text="SUBMIT" />
              </form>
            </div>
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard
