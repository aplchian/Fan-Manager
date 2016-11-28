const React = require('react')
const {style} = require('glamor')
const PageWrapper = require('../page-wrapper.js')
const Button = require('../components/submit-button.js')
const FanItem = require('./components/fan-item.js')
const {Redirect} = require('react-router')

const headerStyle = style({
  width: '100%',
  borderBottom: '1px solid black',
  fontFamily: 'WorkSans-Bold',
})

const Dashboard = React.createClass({
  getInitialState(){
    return({
      edit: null
    })
  },
  componentDidMount(){
    this.props.getFan(this.props.params.id, (err,res) => {
      this.setState(res)
    })
  },
  edit(e){
    e.preventDefault()
    this.setState({
      edit: true
    })
  },
  render(){
    let Edit = this.state.edit ? <Redirect to={`/fans/${this.state._id}/edit`} /> : null
    return(
      <div>
         {Edit}
          <PageWrapper>
            <div {...headerStyle}>
              <h1 {...style({margin:'0 0 4px 0'})}>{this.state.email}</h1>
            </div>
            <FanItem label='First Name' data={this.state.f_name} />
            <FanItem label='Last Name' data={this.state.l_name} />
            <FanItem label='Email' data={this.state.email} />
            <FanItem label='City' data={this.state.city} />
            <FanItem label='State' data={this.state.state} />
            <FanItem label='Join Date' data={this.state.join} />
            <Button text="edit" onClick={this.edit} />

          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard
