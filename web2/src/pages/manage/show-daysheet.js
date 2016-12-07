import React from 'react'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel,PageHeader,ListGroup,ListGroupItem} from 'react-bootstrap'
import PageWrapper from './components/page-wrapper'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
import {Link} from 'react-router'
import {isEmpty,filter,map,compose,reject,concat,tap,flatten,sort,pluck} from 'ramda'
const db = new PouchDB('slo-dev')

const container = style({
  display: 'block',
  margin: "0 auto"
})

const DaySheet = React.createClass({
  getInitialState(){
    return({
      daysheet: {
        date: 'T',
        schedule: []
      },
      schedule: [],
      events: []
    })
  },
  componentDidMount(){
    let date = this.props.params.id.split('_')[1]
    let start = `event_${date}`
    let end = `${start}\uffff`

    const getEvents = compose(
      flatten,
      reject(isEmpty),
      map(item => item.schedule),
      pluck('doc')
    )

    const concatEvents = data => {
      let concatData = getEvents(data).concat(this.state.daysheet.schedule)
      let sorted = sort((a,b) => a.timestart - b.timestart,concatData)
      return sorted
    }

    db.get(this.props.params.id)
      .then(res => this.setState({daysheet: res}))
      .catch(err => console.log(err.message))

    db.allDocs({include_docs: true, startkey: start, endkey: end})
      .then(res => this.setState({
        schedule: concatEvents(res.rows),
        events: pluck('doc',res.rows)
      }))
      .catch(err => console.log(err.message))
  },
  render(){
    const listSchedule = (item,i) => (
      <Panel header={<h3>{item.event}: {item.timestart}-{item.timeend}</h3>}>duration:{item.duration}</Panel>
    )
    const listEvents = (item,i) => (
      <Link to={`/manage/events/${item._id}/show`}>
        <Panel header={<h3>{item.name}: {item.type} </h3>}></Panel>
      </Link>
    )
    return(
      <PageWrapper>
        <Row {...container} className="show-grid">
          <Col xs={12} md={12}>
            <PageHeader>
              {this.state.daysheet.date.split('T')[0]}
              <Button>Edit</Button>
              <Button>Delete</Button>
            </PageHeader>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={5}>
            <PageHeader><h3>Schedule</h3></PageHeader>
            {this.state.schedule.map(listSchedule)}
          </Col>
          <Col xs={12} md={7}>
            <PageHeader><h3>Info</h3></PageHeader>
            <Panel header={<h3>Location</h3>}>
              <div>
                Current: {this.state.daysheet.currentcity}, {this.state.daysheet.currentstate}
              </div>
              <div>
                Destination: {this.state.daysheet.destinationcity}, {this.state.daysheet.destinationstate}
              </div>
            </Panel>
            <PageHeader><h3>Today's Events</h3></PageHeader>
            {this.state.events.map(listEvents)}
          </Col>
          <Col xs={12} md={12}>
            <PageHeader><h3>After Show</h3></PageHeader>
            <Panel header={<h3>Going to:</h3>}>
              <div>
                <div>{this.state.daysheet.destinationname}</div>
                <div>{this.state.daysheet.streetone}</div>
                <div>{this.state.daysheet.streettwo}</div>
                <div>{this.state.daysheet.city}, {this.state.daysheet.state}</div>
                <div>{this.state.daysheet.zipcode}</div>
              </div>
            </Panel>
            <Panel header={<h3>Notes</h3>}>
              <div>
                <div>{this.state.daysheet.notes}</div>
              </div>
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

module.exports = DaySheet
