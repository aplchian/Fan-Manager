const React = require('react')
const {style} = require('glamor')
const PageWrapper = require('../page-wrapper.js')
const Input = require('../components/input-field')
const WarningBar = require('../components/warning-bar')
const Button = require('../components/submit-button.js')

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
      streetteam: ''
    })
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
    this.props.addFan(this.state,(err,res) => {
      if(err) return console.log('err',err)
      return console.log('success',res)
    })
  },
  render(){
    return(
      <div>
          <PageWrapper>
            <div {...containerStyle}>
              <h1>Add fan</h1>
              <WarningBar text="Email Required"/>
              <form onSubmit={this.handleSubmit}>
                <Input placeholder="First" onChange={this.handleChange('f_name')} />
                <Input placeholder="Last" onChange={this.handleChange('l_name')} />
                <Input placeholder="Email" onChange={this.handleChange('email')} />
                <Input placeholder="City" onChange={this.handleChange('city')} />
                <Input placeholder="State" onChange={this.handleChange('state')} />
                <div {...checkboxContainer}>
                  <div {...checkboxStyle}>
                    <label>Street Team</label>
                    <input type="checkbox" onChange={this.handleChange('streetteam')} />
                  </div>
                </div>
                <Button text="SUBMIT" />
              </form>
            </div>
            <pre>
              {JSON.stringify(this.state,null,2)}
            </pre>
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard
