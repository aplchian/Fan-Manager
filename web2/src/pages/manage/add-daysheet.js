import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox} from 'react-bootstrap'
import {style} from 'glamor'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import uuid from 'node-uuid'
import {append,reject,filter,compose,head,path,map,equals,forEach} from 'ramda'
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

const AddEvent = React.createClass({
  getInitialState(){
    return({
      currentcity: '',
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
      band: "slo",
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
  handleSubmit(e){
    e.preventDefault()
    const updateEvents = function(item){
      console.log('item',item)
      db.put(item.doc,(err,res) => {
        if(err) console.log(err)
        console.log('updated!'.res)
      })
    }
    let daysheet = this.state
    daysheet.date = this.state.date.format()
    let date = daysheet.date.split('T')[0]
    daysheet._id = `daysheet_${date}_${this.state.band}`
    this.state.events.forEach(updateEvents)
    delete daysheet.events
    delete daysheet.newevent
    db.put(daysheet,(err,res) => {
      if(err) console.log(err)
      console.log(res)
    })

  },
  handleChange(path){
    return e => {
      let currentState = this.state
      currentState[path] = e.target.value
      this.setState(currentState)
    }
  },
  handleDateChange(date){
    let incomingDate = date.format().split('T')[0]
    let start = `event_${incomingDate}`
    let end = `${start}\uffff`
    db.allDocs({
      include_docs: true,
      startkey: start,
      endkey: end
    }, (err,res) => {
      if (err) return console.log(err.message)
      console.log('got',res)

      this.setState({
        events: res.rows
      })
    })
    this.setState({
      date: date
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
      console.log('remove ',id)
      let currentEvents = this.state.schedule
      let schedule = reject(item => item.id === id,currentEvents)
      this.setState({schedule})
    }
  },
  eventToggle(id){
    const toggle = item => {
      if(item.id === id){
        item.doc.active = !item.doc.active
        return item
      }
      return item
    }
    return e => {
      let events = map(toggle,this.state.events)
      console.log('events',events)
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
    const events = (item,i) => {
      return <FormControl.Static>
                {`(${item.event}): ${item.starttime} - ${item.endtime}`}
                <Button onClick={this.removeEvent(item.id)}>remove</Button>
              </FormControl.Static>
    }
    const listEvents = (item,i) => {
      let checkBox = item.doc.active
                      ? <Checkbox key={i} checked onChange={this.eventToggle(item.id)}>{item.doc.name}</Checkbox>
                      : <Checkbox key={i} onChange={this.eventToggle(item.id)}>{item.doc.name}</Checkbox>
      return checkBox
    }

    return (
      <div>
        <PageWrapper title="Add Daysheet">
          <Row {...container} className="show-grid">
           <Col xs={12} md={12} {...style({width: '100%'})}>
             <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="formBasicText">
                  <ControlLabel >Date</ControlLabel>
                  <DatePicker
                    {...style({display: 'block'})}
                    selected={this.state.date}
                    onChange={this.handleDateChange} />
                  <ControlLabel {...style({display: 'block'})}>Current City</ControlLabel>
                  <FormControl type="text"
                    value={this.state.currentcity}
                    placeholder="Current City"
                    onChange={this.handleChange('currentcity')}
                  />
                  <ControlLabel>Current State</ControlLabel>
                  <FormControl type="text"
                    value={this.state.currentstate}
                    placeholder="Current State"
                    onChange={this.handleChange('currentstate')}
                  />
                  <ControlLabel>Destination City</ControlLabel>
                  <FormControl type="text"
                    value={this.state.destinationcity}
                    placeholder="Destination City"
                    onChange={this.handleChange('destinationcity')}
                  />
                  <ControlLabel>Destination State</ControlLabel>
                  <FormControl type="text"
                    value={this.state.destinationstate}
                    placeholder="Destination State"
                    onChange={this.handleChange('destinationstate')}
                  />
                  <ControlLabel>Schedule</ControlLabel>
                  <Form>
                    <ControlLabel>Event</ControlLabel>
                    <FormControl type="text"
                      value={this.state.newevent.event}
                      placeholder="Dinner"
                      onChange={this.handleAddEvent('event')}
                    />
                    <TimePicker defaultValue={moment('2016-01-01')} onChange={this.handleTimeChange('starttime')} showSecond={false}/>
                    <TimePicker defaultValue={moment('2016-01-01')} onChange={this.handleTimeChange('endtime')} showSecond={false}/>
                    <FormControl type="number"
                      value={this.state.newevent.duration}
                      placeholder="duration"
                      onChange={this.handleAddEvent('duration')}
                    />
                  </Form>
                  <Button {...style({display: 'block'})} onClick={this.addEvent}>Add</Button>
                  {this.state.schedule.map(events)}
                  <ControlLabel>EVENTS</ControlLabel>
                  {this.state.events.map(listEvents)}

                  <ControlLabel>After Show Destination Address:</ControlLabel>
                  <FormControl type="text"
                    value={this.state.destinationname}
                    placeholder="Destination Name"
                    onChange={this.handleChange('destinationname')}
                  />
                  <FormControl type="text"
                    value={this.state.streetone}
                    placeholder="Street Address 1"
                    onChange={this.handleChange('streetone')}
                  />
                  <FormControl type="text"
                    value={this.state.streettwo}
                    placeholder="Street Address 2"
                    onChange={this.handleChange('streettwo')}
                  />
                  <FormControl type="text"
                    value={this.state.city}
                    placeholder="City"
                    onChange={this.handleChange('city')}
                  />
                  <FormControl type="text"
                    value={this.state.state}
                    placeholder="State"
                    onChange={this.handleChange('state')}
                  />
                  <FormControl type="number"
                    value={this.state.zipcode}
                    placeholder="Zipcode"
                    onChange={this.handleChange('zipcode')}
                  />
                  <ControlLabel>Mileage</ControlLabel>
                  <FormControl type="number"
                    value={this.state.mileage}
                    placeholder="Mileage"
                    onChange={this.handleChange('mileage')}
                  />
                  <ControlLabel>Notes</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.notes}
                    placeholder="Notes"
                    onChange={this.handleChange('notes')}
                  />
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

export default AddEvent
