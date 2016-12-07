const React = require('react')
const {style} = require('glamor')
const PageWrapper = require('./components/page-wrapper.js')
const FanItem = require('./components/fan-item.js')
const {Redirect} = require('react-router')
// import {Button} from 'react-bootstrap'
import moment from 'moment'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel,PageHeader,ListGroup,ListGroupItem} from 'react-bootstrap'



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
         <PageWrapper title="View Fan">
           <Row>
             <Col xs={12} md={12}>
               <PageHeader>{this.state.email}</PageHeader>
             </Col>
           </Row>
            <Panel header={`First Name`}>{this.state.f_name}</Panel>
            <Panel header={`Last Name`}>{this.state.l_name}</Panel>
            <Panel header={`Email`}>{this.state.email}</Panel>
            <Panel header={`City`}>{this.state.city}</Panel>
            <Panel header={`State`}>{this.state.state}</Panel>
            <Panel header={`Join Date`}>{moment(this.state.join).format('MMM Do YYYY')}</Panel>
            <Button onClick={this.edit}>EDIT</Button>
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard
