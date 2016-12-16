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
    this.props.getFan(this.props.params.id)
      .then(res => {
        this.setState(res.data)
      })
  },
  edit(e){
    e.preventDefault()
    this.setState({
      edit: true
    })
  },
  deleteFan(){
    this.props.removeFan(this.state._id)
      .then(res => console.log('success!'))
      .catch(err => console.log('error!'))
  },
  render(){
    let Edit = this.state.edit ? <Redirect to={`/fans/${this.state._id}/edit`} /> : null
    const FanItem = ({label,text}) => (
      <div className="fan-item-container">
        <div className="fan-label">{label}</div>
        <div className="fan-item">{text}</div>
      </div>
    )
    return(
      <div>
         {Edit}
         <PageWrapper logout={this.props.logOut} title="View Fan">
           <Row>
             <Col xs={12} md={12}>
               <div className="fan-header">
                 <h1>{this.state.email}</h1>
                 <span onClick={this.edit}>edit</span>
               </div>
             </Col>
           </Row>
           <Row className="fan-content-contain">
             <Col xs={12} md={12}>
               <FanItem label="First Name" text={this.state.f_name} />
               <FanItem label="Last Name" text={this.state.l_name} />
               <FanItem label="Email" text={this.state.email} />
               <FanItem label="City" text={this.state.city} />
               <FanItem label="State" text={this.state.state} />
               <FanItem label="Join Date" text={moment(this.state.join).format('MMM Do YYYY')} />
               <div className="delete-fan" onClick={this.deleteFan}><a>delete fan</a></div>
             </Col>
           </Row>
          </PageWrapper>
      </div>
   )
  }
})



module.exports = Dashboard
