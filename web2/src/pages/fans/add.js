const React = require('react')
const {style} = require('glamor')
const PageWrapper = require('./components/page-wrapper.js')
const Input = require('../components/input-field')
const WarningBar = require('../components/warning-bar')
// const Button = require('../components/submit-button.js')
const PageTitle = require('../components/page-header.js')
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox} from 'react-bootstrap'

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
      success: 'email is required',
      band: this.props.band
    })
  },
  componentDidMount(){
    if(this.props.params.id){
      this.props.getFan(this.props.params.id)
        .then(res => {
          this.setState(res.data)
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
          <PageWrapper logout={this.props.logOut} title="Add Fan">
              <Row>
                <Col>
                  <form className="half-width" onSubmit={this.handleSubmit}>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl type="text"
                      value={this.state.f_name}
                      placeholder="First Name"
                      onChange={this.handleChange('f_name')}
                    />
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl type="text"
                      value={this.state.l_name}
                      placeholder="Last Name"
                      onChange={this.handleChange('l_name')}
                    />
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="email"
                      value={this.state.email}
                      placeholder="Email"
                      onChange={this.handleChange('email')}
                    />
                    <ControlLabel>City</ControlLabel>
                    <FormControl type="text"
                      value={this.state.city}
                      placeholder="City"
                      onChange={this.handleChange('city')}
                    />
                    <ControlLabel>State</ControlLabel>
                    <FormControl type="text"
                      value={this.state.state}
                      placeholder="State"
                      onChange={this.handleChange('state')}
                    />

                    <div {...checkboxContainer}>
                      <div {...checkboxStyle}>
                        <label>Street Team</label>
                        <input type="checkbox" checked={this.state.streetteam} onChange={this.toggleStreetTeam} />
                      </div>
                    </div>
                    <Button className="pull-right" type="submit">Submit</Button>
                  </form>
                </Col>
              </Row>
              {/* <pre>
                {JSON.stringify(this.state,null,2)}
              </pre> */}
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard
