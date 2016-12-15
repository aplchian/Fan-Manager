import React from 'react'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel,PageHeader,ListGroup,ListGroupItem} from 'react-bootstrap'
import PageWrapper from './components/page-wrapper'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
import {Link} from 'react-router'
const db = new PouchDB('slo-dev')

const container = style({
  display: 'block',
  margin: "0 auto"
})

const s_bg = style({
  background: 'url(./images/bg1.png) no-repeat center center',
  backgroundSize: 'cover'
})

const Event = React.createClass({
  getInitialState(){
    return({
      event: {
        name: '',
        date: 'T',
        schedule: [],
        contact: []
      }
    })
  },
  componentDidMount(){
    this.props.getEvent(this.props.params.id)
      .then(res => this.setState({event: res.data}))
      .catch(err => console.log(err.message))
  },
  removeEvent(e){
    e.preventDefault()
    if(confirm('Are you sure you want to delete?')){
      this.props.removeEvent(this.state.event._id)
        .then(res => console.log('success',res))
        .catch(err => console.log('error',err.message))
    }
  },
  render(){

    console.log(this.state)

    const LabelHeader = ({title}) => <div className="show-label-container">{title}</div>

    const ScheduleItem = ({title, duration, start}) => (
      <div className="schedule-item">
        <div className="event-title">{title}</div>
        <div className="event-duration">{duration}</div>
        <div className="start-time">{start}</div>
      </div>
    )

    const ContactItem = ({title,name,email,phone}) => (
      <div className="contact-container">
        <div><span>{title}</span></div>
        <div>{name}</div>
        <div>{email}</div>
        <div>{phone}</div>
      </div>
    )

    const listSchedule = (item,i) => (
      <ScheduleItem key={i} title={item.event} duration={item.duration} start={item.starttime}></ScheduleItem>
    )

    const listContacts = (item,i) => (
      <ContactItem
        key={i}
        title={item.type}
        name={item.name}
        email={item.email}
        phone={item.phone}
      />
    )

    const dealRow = (this.state.event.deal !== '' && this.state.event.deal)
      ? (
        <Row>
          <Col xs={12} md={12}>
            <LabelHeader title="deal" />
            <div className="list-content list-text">
              {this.state.event.deal}
            </div>
          </Col>
        </Row>
      )
      : null

    const parkingRow = (this.state.event.parking !== '' && this.state.event.parking)
      ? (
        <Row>
          <Col xs={12} md={12}>
            <LabelHeader title="parking" />
            <div className="list-content list-text">
              {this.state.event.parking}
            </div>
          </Col>
        </Row>
      )
      :null

    const notesRow = (this.state.event.notes !== '' && this.state.event.notes)
      ? (
        <Row>
          <Col xs={12} md={12}>
            <LabelHeader title="notes" />
            <div className="list-content list-text">
              {this.state.event.notes}
            </div>
          </Col>
        </Row>
      )
      : null

    const contactsRow = (this.state.event.contact.length > 0 && this.state.event.contact)
      ? (
        <Row className="contact-row clearfix">
          <Col xs={12} md={12}>
            <LabelHeader title="contacts" />
            <div className="list-content clearfix">
              {this.state.event.contact.map(listContacts)}
            </div>
          </Col>
        </Row>
      )
      : null

    const scheduleRow = (this.state.event.schedule.length > 0 && this.state.event.schedule)
      ? (
        <Row>
          <Col xs={12} md={12}>
            <LabelHeader title="schedule" />
            {this.state.event.schedule.map(listSchedule)}
          </Col>
        </Row>
      )
      : null

   const confirmedLabel = this.state.event.status === "confirmed"
      ? <div className="event-status confirmed">Confirmed</div>
      : <div className="event-status not-confirmed">Not Confirmed</div>

    return(
      <PageWrapper logout={this.props.logOut}>
        <Row {...s_bg} className="event-hero">
          <Col xs={12} md={12}>
              <div className="event-title-container">
                <h1 className="page-jumbo-title">{this.state.event.name}</h1>
                <h2 className="event-date">{this.state.event.date.split('T')[0]}</h2>
                <h3 className="capacity">{this.state.event.capacity}</h3>
              </div>
              <Link to={`/manage/events/${this.props.params.id}/edit`}><div className="event-edit-btn">Edit</div></Link>
          </Col>
          <div className="event-address-container">
            <h5><span>{this.state.event.venue}</span></h5>
            <h5>{this.state.event.addressone}</h5>
            <h5>{this.state.event.addresstwo}</h5>
            <h5>{this.state.event.city}</h5>
            <h5>{this.state.event.state}</h5>
            <h5>{this.state.event.zipcode}</h5>
          </div>
          {confirmedLabel}
        </Row>
        {scheduleRow}
        {contactsRow}
        {dealRow}
        {parkingRow}
        {notesRow}
        <Row className="show-footer">
          <Col xs={12} md={12}>
            <div className="delete-link" onClick={this.removeEvent}>delete event</div>
          </Col>
        </Row>
        {/* <pre>
          {JSON.stringify(this.state,null,2)}
        </pre> */}
      </PageWrapper>
    )
  }
})

module.exports = Event
