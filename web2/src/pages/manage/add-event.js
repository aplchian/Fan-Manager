import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form} from 'react-bootstrap'
import {style} from 'glamor'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import uuid from 'node-uuid'
import {append,reject} from 'ramda'
import PouchDB from 'pouchdb'
const db = new PouchDB('slo-dev')


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
        name: '',
        type: "show",
        schedule: [],
        date: moment(),
        venue: "",
      	city: "",
      	state: "",
      	streetone: "",
        schedule: [],
        streettwo: "",
      	zipcode: '',
        contact: [{id:'tbone',type: 'Production', name: 'alex boquist', email: "alex@aplchianmedia.com", phone: "8437493102" }],
        parking: "",
        capacity: '',
        deal: "",
        notes: "",
        band: "slo",
        status: 'confirmed',
        newcontact: {
          id: uuid.v4(),
          type: '',
          email: '',
          phone: '',
          name: ''
        },
        newevent: {
          id: uuid.v4(),
          event: '',
          timestart: '',
          timeend: '',
          duration: ''
        }
    })
  },
  handleSubmit(e){
    e.preventDefault()
    let event = this.state
    event.date = this.state.date.format()
    let date = event.date.split('T')[0]
    event._id = `event_${date}_type_${this.state.type}_${this.state.name}`
    console.log('event',event)
    db.put(event,(err,res) => {
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
    this.setState({
      date: date
    })
  },
  handleAddContactChange(path){
    return e => {
      let newcontact = this.state.newcontact
      newcontact[path] = e.target.value
      this.setState({newcontact})
    }
  },
  addContact(e){
    e.preventDefault()
    let currentContacts = this.state.contact
    let updated = append(this.state.newcontact,currentContacts)
    this.setState({
      contact: updated,
      newcontact: {
        id: uuid.v4(),
        type: '',
        email: '',
        phone: '',
        name: ''
      }
    })
  },
  removeContact(id){
    return e => {
      console.log('remove ',id)
      let currentContacts = this.state.contact
      let contact = reject(item => item.id === id,currentContacts)
      this.setState({contact})
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
        timestart: '',
        timeend: ''
      }
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
        timestart: '',
        timeend: ''
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
  render(){
    const contacts = (item,i) => {
      return <FormControl.Static>
                {`(${item.type})${item.name}: ${item.email} - ${item.phone}`}
                <Button onClick={this.removeContact(item.id)}>remove</Button>
              </FormControl.Static>
    }
    const events = (item,i) => {
      return <FormControl.Static>
                {`(${item.event}): ${item.timestart} - ${item.timeend}`}
                <Button onClick={this.removeEvent(item.id)}>remove</Button>
              </FormControl.Static>
            }
    return (
      <div>
        <PageWrapper>
          <Row {...container} className="show-grid">
           <h1>Add Event</h1>
           <Col xs={12} md={12} {...style({width: '100%'})}>
             <form onSubmit={this.handleSubmit}>
                <FormGroup
                  controlId="formBasicText"
                >
                  <ControlLabel>Event Name</ControlLabel>
                  <FormControl type="text"
                    value={this.state.name}
                    placeholder="Enter text"
                    onChange={this.handleChange('name')}
                  />
                  <ControlLabel>Type</ControlLabel>
                  <FormControl onChange={this.handleChange('type')} componentClass="select" placeholder="type">
                    <option value="show">Show</option>
                    <option value="press">Press</option>
                    <option value="other">Other</option>
                  </FormControl>
                  <ControlLabel {...style({display: 'block'})} >Date</ControlLabel>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDateChange} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Venue Name</ControlLabel>
                  <FormControl type="text"
                    value={this.state.venue}
                    placeholder="Enter text"
                    onChange={this.handleChange('venue')}
                  />
                  <ControlLabel>Add Contact</ControlLabel>
                  <Form>
                    <ControlLabel>Type</ControlLabel>
                    <FormControl type="text"
                      value={this.state.newcontact.type}
                      placeholder="...Production"
                      onChange={this.handleAddContactChange('type')}
                    />
                    <FormControl type="text"
                      value={this.state.newcontact.name}
                      placeholder="Name"
                      onChange={this.handleAddContactChange('name')}
                    />
                    <FormControl type="text"
                      value={this.state.newcontact.email}
                      placeholder="Email"
                      onChange={this.handleAddContactChange('email')}
                    />
                    <FormControl type="text"
                      value={this.state.newcontact.phone}
                      placeholder="Phone"
                      onChange={this.handleAddContactChange('phone')}
                    />
                  </Form>
                  <Button {...style({display: 'block'})}  onClick={this.addContact}>Add</Button>
                  {this.state.contact.map(contacts)}
                  <Form>
                    <ControlLabel>Schedule</ControlLabel>
                    <FormControl type="text"
                      value={this.state.newevent.event}
                      placeholder="Dinner"
                      onChange={this.handleAddEvent('event')}
                    />
                    <FormControl type="number"
                      value={this.state.newevent.timestart}
                      placeholder="start time"
                      onChange={this.handleAddEvent('timestart')}
                    />
                    <FormControl type="number"
                      value={this.state.newevent.timeend}
                      placeholder="end time"
                      onChange={this.handleAddEvent('timeend')}
                    />
                    <FormControl type="number"
                      value={this.state.newevent.duration}
                      placeholder="duration"
                      onChange={this.handleAddEvent('duration')}
                    />
                  </Form>
                  <Button {...style({display: 'block'})} onClick={this.addEvent}>Add</Button>
                  {this.state.schedule.map(events)}
                  <ControlLabel>Address</ControlLabel>
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
                  <ControlLabel>Parking</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.parking}
                    placeholder="Parking"
                    onChange={this.handleChange('parking')}
                  />
                  <ControlLabel>Capacity</ControlLabel>
                  <FormControl type="number"
                    value={this.state.capacity}
                    placeholder="Capacity"
                    onChange={this.handleChange('capacity')}
                  />
                  <ControlLabel>Deal</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.deal}
                    placeholder="...deal"
                    onChange={this.handleChange('deal')}
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
        </PageWrapper>
      </div>
    )
  }
})

export default AddEvent
