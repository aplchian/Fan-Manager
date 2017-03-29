import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox} from 'react-bootstrap'
import {style} from 'glamor'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import uuid from 'node-uuid'
import {append,reject,filter,compose,head,path,map,equals,forEach,pluck,tap,propEq,find} from 'ramda'
import PouchDB from 'pouchdb'
const db = new PouchDB('slo-dev')
import TimePicker from 'rc-time-picker'
import {Redirect} from 'react-router'
import 'rc-time-picker/assets/index.css'
import {buildPromises,formatUsers} from '../utils/todos'
require('react-datepicker/dist/react-datepicker.css');


const AddTodo = React.createClass({
  getInitialState(){
    return({
      id: uuid.v4(),
      createddate: moment(),
      duedate: moment(),
      completed: "false",
      assignedto: [],
      band: this.props.band,
      type: "todo",
      members: []
    })
  },
  componentDidMount(){
    const {getTodo,getUser,params: {id}} = this.props
    this.props.getBand(this.state.band)
      .then(({data: {users}}) => {
        Promise.all(map(buildPromises(getUser),users))
          .then(res => this.setState({
            members: formatUsers(res)
          }))
      })
    // if editing
    if(id){
      getTodo(id)
        .then(({data}) => this.setState({
          ...data,
          duedate: moment(data.duedate)
        }))
        .catch(err => console.log(err.message))
    }
  },
  handleDateChange(date){
    this.setState({
      duedate: date
    })
  },
  handleChange(path){
    return e => {
      let currentState = this.state
      currentState[path] = e.target.value
      this.setState(currentState)
    }
  },
  handleSubmit(e){
    e.preventDefault()
    // Update if editing
    if (this.props.params.id){
      this.props.updateTodo(this.state)
        .then(res => this.setState({
          success: true
        }))
        .catch(err => console.log(err.message))
    }else {
      this.props.addTodo(this.state)
        .then(res => this.setState({
          success: true
        }))
        .catch(err => console.log('error',err))
    }
  },
  handleMultiSelect(e){
    const matchUsers = user => find(propEq('id',user.value))(this.state.members)
    const getUsers = item => map(matchUsers,item)
    const assignedto = compose(
      getUsers,
      filter(item => item.status),
      map(item => ({value: item.value, status: item.selected})),
    )(e.target.options)
    this.setState({assignedto})
  },
  render(){
    const listAssignments = item => <option value={item.id}>{item.user}</option>

    return (
      <div>
        {this.state.success ? <Redirect to="/manage/todos" /> : null}
        <PageWrapper logout={this.props.logOut} title="Add Todo">
          <Row className="show-grid">
           <Col xs={12} md={12}{...style({width: '100%'})}>
             <form className="half-width" onSubmit={this.handleSubmit}>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Due Date</ControlLabel>
                  <DatePicker
                    {...style({display: 'block'})}
                    selected={this.state.duedate}
                    onChange={this.handleDateChange} />
                  <ControlLabel {...style({display: 'block'})} >Task</ControlLabel>
                  <FormControl type="text"
                    value={this.state.title}
                    placeholder="task"
                    onChange={this.handleChange('title')}
                  />
                  <ControlLabel {...style({display: 'block'})} >Notes</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.notes}
                    placeholder="task"
                    onChange={this.handleChange('notes')}
                  />
                  <FormGroup controlId="formControlsSelectMultiple">
                    <ControlLabel>Assigned To: (drag or cmd + select for multi select)</ControlLabel>
                    <FormControl onChange={this.handleMultiSelect} componentClass="select" multiple>
                      {map(listAssignments,this.state.members)}
                    </FormControl>
                    <ControlLabel>Status:</ControlLabel>
                    <FormControl value={this.state.completed} onChange={this.handleChange('completed')} componentClass="select" placeholder="type">
                      <option value={true}>Completed</option>
                      <option value={false}>Not Completed</option>
                    </FormControl>
                  </FormGroup>
                  <Button className="form-btn pull-right" type="submit">Submit</Button>
                </FormGroup>
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

export default AddTodo
