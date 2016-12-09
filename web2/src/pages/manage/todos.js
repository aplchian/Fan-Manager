import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel,Accordion} from 'react-bootstrap'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
import {Link} from 'react-router'
const db = new PouchDB('slo-dev')
import {filter,pluck,reject} from 'ramda'
import moment from 'moment'
import DatePicker from 'react-datepicker'


const container = style({
  display: 'block',
  margin: "0 auto"
})

const sideBarStyle = style({
  borderRadius: '4px',
  textAlign: 'center',
  paddingBottom: '40px'
})

const mainSectionStyle = style({
  paddingLeft: 30,
  padding: '0 0 40px 0'
})


const ListEvents = React.createClass({
  getInitialState(){
    return({
      filter: '',
      filterkey: 0,
      data: [],
      results: [],
      endDate: moment().add(1, 'months'),
      startDate: moment(),
      band: "band_Stop_Light_Observations",
      display: "all"
    })
  },
  componentDidMount(){
    let data = {
      artistId: this.state.band,
      startdate: this.state.startDate.format(),
      enddate: this.state.endDate.format()
    }
    this.props.getArtistTodos(data)
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
      this.setState(currentState)
    }
  },
  handleSearch(){
    let data = {
      artistId: this.state.band,
      startdate: this.state.startDate.format(),
      enddate: this.state.endDate.format()
    }
    this.props.getArtistTodos(data)
      .then(res => this.setState({
        results: pluck('doc',res.data)
      }))
      .catch(err => console.log(err.message))
  },
  handleChange(path){
    return e => {
      let currentState = this.state
      currentState[path] = e.target.value
      this.setState(currentState)
    }
  },
  render(){
    const results = (item,i) => {
      let date = item.duedate.split('T')[0]
      const assignedTo = item => {
        return (
          <span> {item} </span>
        )
      }
      return (
        <Panel header={item.title} eventKey={i}>
          <div>
            <div>Notes: {item.notes}</div>
            <div>Complete: {item.completed ? 'True' : 'False'} </div>
            <div><Link to={`/manage/todos/${item._id}/edit`}>Edit</Link></div>
            <div>Assigned To: {item.assignedto.map(assignedTo)}</div>
          </div>
         </Panel>
      )
    }

    var todos

    if(this.state.display === 'active'){
      todos = filter(item => item.completed,this.state.results)
    }else if(this.state.display === 'completed'){
      todos = reject(item => item.completed,this.state.results)
    }else{
      todos = this.state.results
    }

    return(
      <div>
        <PageWrapper title="Todos">
          <div>fix this?</div>
          <Row {...container} className="show-grid">
            <Col xs={12} md={4}>
              <h3 {...style({textAlign: 'center'})}>Filter</h3>
                <DatePicker
                  selected={this.state.startDate}
                  selectsStart  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleDateChange('startDate')} />
                <DatePicker
                  selected={this.state.endDate}
                  selectsEnd  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleDateChange('endDate')} />
                  <Button {...style({display: 'block'})} onClick={this.handleSearch}>Search</Button>
                  <FormControl value={this.state.display} onChange={this.handleChange('display')} componentClass="select" placeholder="type">
                    <option value="all">All</option>
                    <option value="active">Not Completed</option>
                    <option value="completed">Completed</option>
                  </FormControl>
              <Nav {...style({marginTop:'50px'})} bsStyle="pills" stacked>
                <NavItem><Link to="/manage/todos/add">Add Todo</Link></NavItem>
              </Nav>
            </Col>
            <Col xs={12} md={8}>
              <h3 className="search-result-header">Results</h3>
              <Accordion>
                {todos.map(results)}
              </Accordion>
            </Col>
          </Row>
        </PageWrapper>
      </div>
    )
  }
})

export default ListEvents
