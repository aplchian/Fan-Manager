import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col, FormControl, Button, Nav, Panel} from 'react-bootstrap'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
import {Link} from 'react-router'
import {filter, pluck, sort, map} from 'ramda'
import moment from 'moment'
var FontAwesome = require('react-fontawesome')
import DatePicker from 'react-datepicker'


const ListEvents = React.createClass({
  getInitialState(){
    return({
      filter: '',
      filterkey: 0,
      data: [],
      results: [],
      endDate: moment().add(1, 'years'),
      startDate: moment(),
      band: this.props.band,
      order: 'asc'
    })
  },
  componentDidMount(){
    let data = {
      artistId: this.state.band,
      startdate: this.state.startDate.format(),
      enddate: this.state.endDate.format()
    }
    this.props.getArtistEvents(data)
      .then(res => this.setState({
        results: pluck('doc',res.data)
      }))
      .catch(err => console.log(err.message))
  },
  handleSelect(type){
    const filterData = type => {
      return item => {
        return item.eventtype === type
      }
    }
    let results = filter(filterData(type),this.state.data)
    this.setState({
      filter: type,
      results
     })
  },
  handleDateChange(path){
    return date => {
      let currentState = this.state
      currentState[path] = date
      this.setState({
        currentState,
        display: 'custom'
      })
    }
  },
  handleSearch(){
    let data = {
      artistId: this.state.band,
      startdate: this.state.startDate.format(),
      enddate: this.state.endDate.format()
    }
    this.props.getArtistEvents(data)
      .then(res => this.setState({
        results: pluck('doc',res.data)
      }))
      .catch(err => console.log(err.message))
  },
  handleChange(path){
    return e => {
      let currentState = this.state
      currentState[path] = e.target.value
      if(e.target.value === "seven"){
        currentState['endDate'] = moment().add(7, 'days')
      }else if(e.target.value === 'thirty'){
        currentState['endDate'] = moment().add(1, 'months')
      }else if(e.target.value === 'year'){
        currentState['endDate'] = moment().add(1, 'years')
      }
      this.setState(currentState, () => {this.handleSearch()})

    }
  },
  toggleSort(){
    let order = this.state.order === 'asc' ? 'desc' : 'asc'
    this.setState({order})
  },
  render(){
    const results = (item,i) => {
      let date = moment(item.date.split('T')[0]).format('MMM DD')
      let icon
      if(item.eventtype === 'press'){
        icon = <FontAwesome name='microphone' />
      }else if(item.eventtype === 'show'){
        icon = <FontAwesome name='ticket' />
      }else {
        icon = <FontAwesome name='diamond' />
      }
      return (
        <Link key={i} to={`/manage/events/${item._id}/show`}>
          <Panel className="event-panel" key={i}>
            <div className="panel-date">{icon} {date}</div>
            <div className="panel-event-name">{item.name}</div>
            <div className="panel-event-location">{item.city},{item.state}</div>
          </Panel>
         </Link>
      )
    }

    //sorts by comparing two dates unix
    const asc = (a, b) => { return moment(a.date.split('T')[0]).unix() - moment(b.date.split('T')[0]).unix(); }
    const desc = (a, b) => { return moment(b.date.split('T')[0]).unix() - moment(a.date.split('T')[0]).unix(); }

    const resultsList = this.state.order === 'asc'
      ? map(results,sort(asc,this.state.results))
      : map(results,sort(desc,this.state.results))

    const sortIcon = this.state.order === 'asc'
      ? <FontAwesome className="sort-icon-asc" name='sort-asc' />
      : <FontAwesome className="sort-icon" name='sort-desc' />


    return(
      <div>
        <PageWrapper user={this.props.user} logout={this.props.logOut} title="Events">
          <div {...style({color: 'white'})}>fix this?</div>
          <Row className="show-grid">
            <Col xs={12} md={2} className="search-sidebar">
              <h3 className="search-result-header">Filter</h3>
                <DatePicker
                  className="date-picker"
                  selected={this.state.startDate}
                  selectsStart  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleDateChange('startDate')} />
                  <p className="sidebar-to">to</p>
                <DatePicker
                  className="date-picker"
                  selected={this.state.endDate}
                  selectsEnd  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleDateChange('endDate')} />
                  <FormControl className="sidebar-select" value={this.state.display} onChange={this.handleChange('display')} componentClass="select" placeholder="type">
                    <option value="year">1 year</option>
                    <option value="thirty">30 days</option>
                    <option value="seven">7 days</option>
                    <option value="custom">custom</option>
                  </FormControl>
                  <Button className="sidebar-btn" onClick={this.handleSearch}>Search</Button>
              <Nav {...style({marginTop:'50px'})} bsStyle="pills" stacked>
                <div className="add-link"><Link to="/manage/events/add">+ add event</Link></div>
              </Nav>
            </Col>
            <Col xs={12} md={10} className="search-results">
              <h3 onClick={this.toggleSort} className="search-result-header">Results {sortIcon}</h3>
              {resultsList}
            </Col>
          </Row>
        </PageWrapper>
      </div>
    )
  }
})

export default ListEvents
