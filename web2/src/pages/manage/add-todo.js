import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox} from 'react-bootstrap'
import {style} from 'glamor'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import uuid from 'node-uuid'
import {append,reject,filter,compose,head,path,map,equals,forEach,pluck,tap} from 'ramda'
import PouchDB from 'pouchdb'
const db = new PouchDB('slo-dev')
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'

require('react-datepicker/dist/react-datepicker.css');

const container = style({
  display: 'block',
  margin: "0 auto"
})

const inputStyle = style({
  width: '100%'
})

const AddTodo = React.createClass({
  getInitialState(){
    return({
      id: uuid.v4(),
      title: "",
      notes: "",
      createddate: moment(),
      duedate: moment(),
      completed: false,
      assignedto: [],
      band: "band_Stop_Light_Observations",
      type: "todo"
    })
  },
  componentDidMount(){
    if(this.props.params.id){
      this.props.getTodo(this.props.params.id)
        .then(res => this.setState({
          ...res.data,
          duedate: moment(res.data.duedate)
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
    if (this.props.params.id){
      this.props.updateTodo(this.state)
        .then(res => console.log(res))
        .catch(err => console.log(err.message))
    }else {
      this.props.addTodo(this.state)
        .then(res => console.log('success',res))
        .catch(err => console.log('error',err))
    }
  },
  handleMultiSelect(e){
    let activeOptions = compose(
      pluck('value'),
      filter(item => item.status),
      map(item => ({value: item.value, status: item.selected}))
    )(e.target.options)
    this.setState({
      assignedto: activeOptions
    })
  },
  render(){
    return (
      <div>
        <PageWrapper title="Add Todo">
          <Row {...container} className="show-grid">
           <Col xs={12} md={12} {...style({width: '100%'})}>
             <form onSubmit={this.handleSubmit}>
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
                    <ControlLabel>Assigned To:</ControlLabel>
                    <FormControl onChange={this.handleMultiSelect} componentClass="select" multiple>
                      <option value="user_alex_boquist">Alex Boquist</option>
                      <option value="user_sarah_graif">Sarah Graif</option>
                      <option value="user_will_blackburn">Will Blackburn</option>
                    </FormControl>
                    <ControlLabel>Status:</ControlLabel>
                    <FormControl value={this.state.completed} onChange={this.handleChange('completed')} componentClass="select" placeholder="type">
                      <option value={true}>Completed</option>
                      <option value={false}>Not Completed</option>
                    </FormControl>
                  </FormGroup>
                  <Button type="submit">Submit</Button>
                </FormGroup>
              </form>
           </Col>
          </Row>
          <pre>
            {JSON.stringify(this.state,null,2)}
          </pre>
        </PageWrapper>
      </div>
    )
  }
})

export default AddTodo
