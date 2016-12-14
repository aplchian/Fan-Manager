import React from 'react'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel,PageHeader,ListGroup,ListGroupItem} from 'react-bootstrap'
import PageWrapper from './components/page-wrapper'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
import {Link} from 'react-router'
import {isEmpty,filter,map,compose,reject,concat,tap,flatten,sort,pluck,split} from 'ramda'
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
    const removeColon = item => {
      let arr = item.split(":")
      return concat(arr[0],arr[1])
    }
    const getDate = () => {
      let date = this.state.daysheet.date
      let data = {
        artistId: this.state.daysheet.band,
        startdate: date,
        enddate: date
      }
      const concatEvents = data => {
        let concatData = getEvents(data).concat(this.state.daysheet.schedule)
        let sorted = sort((a,b) => removeColon(a.starttime) - removeColon(b.starttime),concatData)
        return sorted
      }
      this.props.getArtistEvents(data)
        .then(res => {
          this.setState({
            schedule: concatEvents(res.data),
            events: pluck('doc',res.data),
            date: date
          }, () => {console.log('afterState',this.state)})
        })
    }
    this.props.getDaySheet(this.props.params.id)
      .then(res => this.setState({daysheet: res.data}, () => getDate()))
      .catch(err => console.log(err.message))

  },
  removeDaySheet(e){
    e.preventDefault()
    if(confirm('Are you sure you want to delete this daysheet?')){
      this.props.removeDaySheet(this.state.daysheet._id)
        .then(res => console.log('deleted!',res))
        .catch(err => console.log('error!',err.message))
    }
  },
  render(){
    const listSchedule = (item,i) => (
      <Panel header={<h3>{item.event}: {item.starttime}-{item.starttime}</h3>}>duration:{item.duration}</Panel>
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
              <h1 className="daysheet-date">{this.state.daysheet.date.split('T')[0]}</h1>
              <Link to={`/manage/daysheets/${this.state.daysheet._id}/edit`}><Button>Edit</Button></Link>
              <Button onClick={this.removeDaySheet}>Delete</Button>
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
