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
      fname: '',
      lname: '',
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
  render(){
    return(
      <div>
          <PageWrapper>
            <div {...containerStyle}>
              <h1>Add fan</h1>
              <WarningBar text="Email Required"/>
              <form>
                <Input placeholder="First" onChange={this.handleChange('fname')} />
                <Input placeholder="Last" onChange={this.handleChange('lname')} />
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
            {/* <pre>
              {JSON.stringify(this.state,null,2)}
            </pre> */}
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard
