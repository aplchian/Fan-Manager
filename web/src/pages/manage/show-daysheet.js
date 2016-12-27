import React from 'react'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel,PageHeader,ListGroup,ListGroupItem} from 'react-bootstrap'
import PageWrapper from './components/page-wrapper'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
import {Link,Redirect} from 'react-router'
import {isEmpty,filter,map,compose,reject,concat,tap,flatten,sort,pluck,split,join} from 'ramda'
import LabelHeader from './components/label-header'
import ScheduleItem from './components/schedule-item'
import moment from 'moment'
import combineAndSort from './helpers/combine-and-sort'

const db = new PouchDB('slo-dev')

const container = style({
  display: 'block',
  margin: "0 auto"
})

const s_bg = style({
  background: 'url(./images/bg1.png) no-repeat center center',
  backgroundSize: 'cover'
})

const DaySheet = React.createClass({
  getInitialState(){
    return({
      daysheet: {
        date: 'T',
        schedule: []
      },
      schedule: [],
      events: [],
      success: false
    })
  },
  componentDidMount(){

    const date = this.props.params.id.split('_')[1]
    const start = `event_${date}`
    const end = `${start}\uffff`

    const getDate = ({date,band,schedule},getEvents) => {
      const options = {
        artistId: band,
        startdate: date,
        enddate: date
      }
      getEvents(options)
        .then(res => {
          this.setState({
            schedule: combineAndSort(res.data,schedule),
            events: pluck('doc',res.data),
            date: date
          })
        })
    }

    this.props.getDaySheet(this.props.params.id)
      .then(res => this.setState({daysheet: res.data}, () => getDate(this.state.daysheet,this.props.getArtistEvents)))
      .catch(err => console.log(err.message))

  },
  removeDaySheet(e){
    e.preventDefault()
    if(confirm('Are you sure you want to delete this daysheet?')){
      this.props.removeDaySheet(this.state.daysheet._id)
        .then(res => this.setState({
          deleted: true
        }))
        .catch(err => console.log('error!',err.message))
    }
  },
  render(){

    const listSchedule = (item,i) => (
      <ScheduleItem key={i} title={item.event} duration={item.duration} start={item.starttime} />
    )
    const listEvents = (item,i) => {
      let eventLink = <Link to={`/manage/events/${item._id}/show`}>{item.name}</Link>
      return <ScheduleItem key={i} title={eventLink} />
    }

    let date = this.state.daysheet.date === 'T'
      ? null
      : moment(this.state.daysheet.date).format('MMM DD YYYY')

    const todaysSchedule = this.state.schedule.length > 0
      ? (
        <Row>
          <Col xs={12} md={12}>
            <LabelHeader title="Today's Schedule"/>
            {this.state.schedule.map(listSchedule)}
          </Col>
        </Row>
      )
      : null

      const todaysEvents = this.state.events.length > 0
        ? (
          <Row>
            <Col xs={12} md={12}>
              <LabelHeader title="Today's Events"/>
              {this.state.events.map(listEvents)}
            </Col>
          </Row>
        )
        : null

        const eodAddress = (this.state.daysheet.city !== '' && this.state.daysheet.city)
          ? (
            <Row>
              <Col xs={12} md={12}>
                <LabelHeader title="End of Day Destination"/>
                <div className="eod-address">
                  <div><span>{this.state.daysheet.destinationname}</span></div>
                  <div>{this.state.daysheet.streetone}</div>
                  <div>{this.state.daysheet.streettwo}</div>
                  <div>{this.state.daysheet.city}, {this.state.daysheet.state}</div>
                  <div>{this.state.daysheet.zipcode}</div>
                </div>
              </Col>
            </Row>
          )
          : null

          const notes = (this.state.daysheet.notes !== '' && this.state.daysheet.notes)
            ? (
              <Row>
                <Col xs={12} md={12}>
                  <LabelHeader title="notes"/>
                  <div className="list-content">
                    {this.state.daysheet.notes}
                  </div>
                </Col>
              </Row>
            )
            : null


    return(
      <PageWrapper logout={this.props.logOut}>
        {this.state.deleted ? <Redirect to="/manage/daysheets" /> : null}
        <Row {...s_bg} className="daysheet-hero">
              <h1 className="daysheet-date">{date}</h1>
              <Link to={`/manage/daysheets/${this.props.params.id}/edit`}><div className="event-edit-btn">Edit</div></Link>
              <div className="daysheet-city-contain">{this.state.daysheet.currentcity}, {this.state.daysheet.currentstate}   ->   {this.state.daysheet.destinationcity}, {this.state.daysheet.destinationstate}</div>
        </Row>
        {todaysSchedule}
        {todaysEvents}
        {eodAddress}
        {notes}
        <Row className="show-footer">
          <Col xs={12} md={12}>
            <div className="delete-link" onClick={this.removeDaySheet}>delete daysheet</div>
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
