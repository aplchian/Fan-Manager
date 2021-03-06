import React from 'react'
import PageWrapper from './components/page-wrapper'
import { Row, Col, Button, Nav } from 'react-bootstrap'
import { style } from 'glamor'
import { Link } from 'react-router'
import { pluck } from 'ramda'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { sortBy, sortIcon } from '../utils/daysheets'

const DaySheets = React.createClass({
  getInitialState() {
    return ({
      filter: '',
      filterkey: 0,
      data: [],
      results: [],
      endDate: moment().add(1, 'years'),
      startDate: moment(),
      band: this.props.band,
      order: 'asc',
      user: this.props.user
    })
  },
  componentDidMount() {
    this.handleSearch()
  },
  handleSelect(type) {
    let results = this.state.data
    this.setState({
      filter: type,
      results
    })
  },
  handleDateChange(path) {
    return date => {
      let currentState = this.state
      currentState[path] = date
      this.setState(currentState)
    }
  },
  handleSearch() {
    let searchData = {
      artistId: this.state.band,
      startdate: this.state.startDate.format(),
      enddate: this.state.endDate.format()
    }
    this.props.getArtistDaySheets(searchData)
      .then(({ data }) => {
        this.setState({ results: pluck('doc', data) })
      })
      .catch(err => console.log(err.message))
  },
  toggleSort() {
    let order = this.state.order === 'asc' ? 'desc' : 'asc'
    this.setState({ order })
  },
  render() {
    const {
      results,
      order,
      user,
      startDate,
      endDate
    } = this.state
    const sortedResults = sortBy(order, results)
    const sortedIcon = sortIcon(order)
    return (
      <div>
        <PageWrapper logout={this.props.logOut} user={user} title="Daysheets">
          <div {...style({ color: 'white' }) }>fix this?</div>
          <Row className="show-grid">
            <Col xs={12} md={2} className="search-sidebar">
              <h3 className="search-result-header">Options</h3>
              <DatePicker
                className="date-picker"
                selected={startDate}
                selectsStart startDate={startDate}
                endDate={endDate}
                onChange={this.handleDateChange('startDate')} />
              <p className="sidebar-to">to</p>
              <DatePicker
                className="date-picker"
                selected={endDate}
                selectsEnd startDate={startDate}
                endDate={endDate}
                onChange={this.handleDateChange('endDate')} />
              <Button className="sidebar-btn" onClick={this.handleSearch}>Search</Button>
              <Nav {...style({ marginTop: '50px' }) } bsStyle="pills" stacked>
                <div className="add-link">
                  <Link to="/manage/daysheets/add">+ add daysheet</Link>
                </div>
              </Nav>
            </Col>
            <Col xs={12} md={10} className="search-results">
              <h3 onClick={this.toggleSort} className="search-result-header">Results{sortedIcon}</h3>
              {sortedResults}
            </Col>
          </Row>
        </PageWrapper>

      </div>
    )
  }
})

export default DaySheets
