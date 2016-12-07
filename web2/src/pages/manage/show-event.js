import React from 'react'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel,PageHeader,ListGroup,ListGroupItem} from 'react-bootstrap'
import PageWrapper from './components/page-wrapper'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
const db = new PouchDB('slo-dev')

const container = style({
  display: 'block',
  margin: "0 auto"
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
    db.get(this.props.params.id)
      .then(res => this.setState({event: res}))
      .catch(err => console.log(err.message))
  },
  render(){
    const listSchedule = (item,i) => (
      <ListGroupItem key={i}>{item.event} -- {item.timestart} - {item.timeend} -> {item.duration}min </ListGroupItem>
    )
    const listContacts = (item,i) => (
      <div {...style({marginBottom: 10})}>
        <div><b>{item.type}</b></div>
        <div>{item.name}</div>
        <div>{item.email}</div>
        <div>{item.phone}</div>
      </div>
    )


    return(
      <PageWrapper>
        <Row {...container} className="show-grid">
          <Col xs={12} md={12}>
            <PageHeader>
              {this.state.event.name}
              <small>{this.state.event.date.split('T')[0]}</small>
              <small>{this.state.event.type}</small>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={5}>
            <PageHeader><h3>Schedule</h3></PageHeader>
            <ListGroup>
              {this.state.event.schedule.map(listSchedule)}
            </ListGroup>
          </Col>
          <Col xs={12} md={7}>
            <PageHeader><h3>Venue</h3></PageHeader>
            <Panel header={<h3>Address</h3>}>
              <div>{this.state.event.venue}</div>
              <div>{this.state.event.streetone}</div>
              <div>{this.state.event.streettwo}</div>
              <div>{this.state.event.city}</div>
              <div>{this.state.event.state}</div>
              <div>{this.state.event.zipcode}</div>
            </Panel>
            <Panel header={<h3>Contact</h3>}>
              {this.state.event.contact.map(listContacts)}
            </Panel>
            <Panel header={<h3>Parking</h3>}>
              {this.state.event.parking}
            </Panel>
            <Panel header={<h3>Capacity</h3>}>
              {this.state.event.capacity}
            </Panel>
            <Panel header={<h3>Deal</h3>}>
              {this.state.event.deal}
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <PageHeader><h3>Other</h3></PageHeader>
            <Panel header={<h3>Status</h3>}>
              {this.state.event.active ? 'Active' : 'Not Active'}
            </Panel>
            <Panel header={<h3>Notes</h3>}>
              {this.state.event.notes}
            </Panel>
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
