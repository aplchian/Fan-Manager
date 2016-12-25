import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox} from 'react-bootstrap'
import {style} from 'glamor'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import uuid from 'node-uuid'
import {append,reject,filter,compose,head,path,map,equals,forEach,pluck} from 'ramda'
import PouchDB from 'pouchdb'
const db = new PouchDB('slo-dev')
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import {Redirect} from 'react-router'

require('react-datepicker/dist/react-datepicker.css');

const container = style({
  display: 'block',
  margin: "0 auto"
})

const inputStyle = style({
  width: '100%'
})

const AddEvent = React.createClass({
  getInitialState(){
    return({
      currentcity: '',
      type: 'daysheet',
      currentstate: '',
      destinationcity: '',
      destinationstate: '',
      schedule: [],
      date: moment(),
      events: [],
      addressone: '',
      addresstwo: '',
      city: '',
      state: '',
      zipcode: '',
      mileage: '',
      notes: "",
      band: this.props.band,
      mileage: '',
      destinationname: '',
      newevent: {
        id: uuid.v4(),
        event: '',
        starttime: '',
        endtime: '',
        duration: ''
      }
    })
  },
  componentDidMount(){
    if(this.props.params.id){
      this.props.getDaySheet(this.props.params.id)
        .then(res => this.setState({
          ...res.data,
          date: moment(res.data.date.split('T')[0])
        }))
    }
    this.handleDateChange()
  },
  handleSubmit(e){
    e.preventDefault()
    if(this.props.params.id){
      let doc = this.state
      this.props.updateDaySheet(doc)
      .then(res => {this.setState({success: true,})})
      .catch(err => {this.setState({success: true})})
    }else{
      this.props.addDaySheet(this.state)
        .then(res => this.setState({success: true}))
        .catch(err => this.setState({success: true}))
     }
  },
  handleChange(path){
    return e => {
      let currentState = this.state
      currentState[path] = e.target.value
      this.setState(currentState)
    }
  },
  handleDateChange(date){
    let data = {
      artistId: this.state.band,
      enddate: date.format(),
      startdate: date.format()
    }
    this.props.getArtistEvents(data)
      .then(res => {
        this.setState({
          events: pluck('doc',res.data),
          date: date
        })
      })
  },
  handleAddEvent(path){
    return e => {
      let newevent = this.state.newevent
      newevent[path] = e.target.value
      this.setState({newevent})
    }
  },
  addEvent(e){
    e.preventDefault()
    let currentContacts = this.state.schedule
    let updated = append(this.state.newevent,currentContacts)
    this.setState({
      schedule: updated,
      newevent: {
        id: uuid.v4(),
        event: '',
        starttime: '',
        endtime: ''
      }
    })
  },
  removeEvent(id){
    return e => {
      let currentEvents = this.state.schedule
      let schedule = reject(item => item.id === id,currentEvents)
      this.setState({schedule})
    }
  },
  eventToggle(id){
    const toggle = item => {
      if(item.id === id){
        item.status = item.status === 'confirmed' ? 'notconfirmed' : 'confirmed'
        return item
      }
      return item
    }
    return e => {
      let events = map(toggle,this.state.events)
      this.setState({events})
    }
  },
  handleTimeChange(path){
    return value => {
      let newevent = this.state.newevent
      newevent[path] = value.format('HH:mm')
      this.setState({newevent})
    }
  },
  render(){
    const {
      success,
      date,
      currentcity,
      currentstate,
      destinationcity,
      destinationstate,
      destinationname,
      schedule,
      events,
      streetone,
      streettwo,
      city,
      state,
      zipcode,
      mileage,
      notes,
    } = this.state

    const showEvents = (item,i) => {
      return <FormControl.Static className="form-item-container">
              <span className="form-item-title">
                {`${item.event}`}
              </span>
                <Button className="pull-right remove-btn" onClick={this.removeEvent(item.id)}>remove</Button>
              </FormControl.Static>
    }
    const listEvents = (item,i) => {
      let checkBox = item.status === 'confirmed'
                      ? <Checkbox key={i} checked onChange={this.eventToggle(item.id)}>{item.name}</Checkbox>
                      : <Checkbox key={i} onChange={this.eventToggle(item.id)}>{item.name}</Checkbox>
      return checkBox
    }

    return (
      <div>
        {success ? <Redirect to="/manage/daysheets" /> : null}
        <PageWrapper logout={this.props.logOut} title="Add Daysheet">
          <Row {...container} className="show-grid">
           <Col xs={12} md={12} {...style({width: '100%'})}>
             <form className="half-width clearfix" onSubmit={this.handleSubmit}>
                <FormGroup className="clearfix main-form" controlId="formBasicText">
                  <ControlLabel >Date</ControlLabel>
                  <DatePicker
                    {...style({display: 'block'})}
                    selected={date}
                    onChange={this.handleDateChange} />
                  <ControlLabel {...style({display: 'block'})}>Current City</ControlLabel>
                  <FormControl type="text"
                    value={currentcity}
                    placeholder="Current City"
                    onChange={this.handleChange('currentcity')}
                  />
                  <ControlLabel>Current State</ControlLabel>
                  <FormControl type="text"
                    value={currentstate}
                    placeholder="Current State"
                    onChange={this.handleChange('currentstate')}
                  />
                  <ControlLabel>Destination City</ControlLabel>
                  <FormControl type="text"
                    value={destinationcity}
                    placeholder="Destination City"
                    onChange={this.handleChange('destinationcity')}
                  />
                  <ControlLabel>Destination State</ControlLabel>
                  <FormControl type="text"
                    value={destinationstate}
                    placeholder="Destination State"
                    onChange={this.handleChange('destinationstate')}
                  />
                  <Form className="form-container">
                    <ControlLabel>Event</ControlLabel>
                    <FormControl type="text"
                      value={this.state.newevent.event}
                      placeholder="Sound check"
                      onChange={this.handleAddEvent('event')}
                    />

                    <TimePicker defaultValue={moment('2016-01-01')} onChange={this.handleTimeChange('starttime')} showSecond={false}/>
                    <span className="to">to</span>
                    <TimePicker defaultValue={moment('2016-01-01')} onChange={this.handleTimeChange('endtime')} showSecond={false}/>
                    <FormControl type="text"
                      value={this.state.newevent.duration}
                      placeholder="duration"
                      onChange={this.handleAddEvent('duration')}
                    />
                    <div className="add-btn-container clearfix">
                      <Button className="form-btn pull-right" {...style({display: 'block'})} onClick={this.addEvent}>Add</Button>
                    </div>
                  </Form>
                  <div className="form-items-container">
                    {schedule.map(showEvents)}
                  </div>
                  <div className="form-items-container">
                    {events.map(listEvents)}
                  </div>
                  <ControlLabel>After Show Destination Address:</ControlLabel>
                  <FormControl type="text"
                    value={destinationname}
                    placeholder="Destination Name"
                    onChange={this.handleChange('destinationname')}
                  />
                  <FormControl type="text"
                    value={streetone}
                    placeholder="Street Address 1"
                    onChange={this.handleChange('streetone')}
                  />
                  <FormControl type="text"
                    value={streettwo}
                    placeholder="Street Address 2"
                    onChange={this.handleChange('streettwo')}
                  />
                  <FormControl type="text"
                    value={city}
                    placeholder="City"
                    onChange={this.handleChange('city')}
                  />
                  <FormControl type="text"
                    value={state}
                    placeholder="State"
                    onChange={this.handleChange('state')}
                  />
                  <FormControl type="number"
                    value={zipcode}
                    placeholder="Zipcode"
                    onChange={this.handleChange('zipcode')}
                  />
                  <ControlLabel>Mileage</ControlLabel>
                  <FormControl type="number"
                    value={mileage}
                    placeholder="Mileage"
                    onChange={this.handleChange('mileage')}
                  />
                  <ControlLabel>Notes</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={notes}
                    placeholder="Notes"
                    onChange={this.handleChange('notes')}
                  />
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

export default AddEvent
