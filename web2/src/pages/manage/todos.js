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
const FontAwesome = require('react-fontawesome')


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
      band: this.props.band,
      display: "active"
    })
  },
  componentDidMount(){
    const tap = (item) => {
      console.log('dattta',item)
      return item
    }
    let data = {
      artistId: this.state.band,
      startdate: this.state.startDate.format(),
      enddate: this.state.endDate.format()
    }
    this.props.getArtistTodos(data)
      .then(res => {
        console.log('res',res.data)
        this.setState({
          results: pluck('doc',res.data)
        })
      })
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
    console.log(this.state)
    const results = (item,i) => {
      let date = item.duedate.split('T')[0]
      const assignedTo = item => {
        return (
          <span> {item} </span>
        )
      }
      const panelClass = item.completed === "true" ? 'completed-todo' : 'todo'
      let title = <div><FontAwesome name='tasks' /><h4>{item.title}</h4></div>
      return (
        <Panel className={`${panelClass} panel-todo-body`} header={title} eventKey={i}>
          <div>
            <div className="todo-notes">{item.notes}</div>
            <div className="todo-edit-btn"><Link to={`/manage/todos/${item._id}/edit`}>Edit</Link></div>
            <div className="todo-assignedto">Assigned To: {item.assignedto.map(assignedTo)}</div>
          </div>
         </Panel>
      )
    }

    var todos

    if(this.state.display === 'completed'){
      todos = filter(item => item.completed === "true",this.state.results)
    }else if(this.state.display === 'active'){
      todos = reject(item => item.completed === "true",this.state.results)
    }else{
      todos = this.state.results
    }

    return(
      <div>
        <PageWrapper logout={this.props.logOut} title="Todos">
          <div {...style({color: 'white'})} >fix this</div>
          <Row {...container} className="show-grid">
            <Col xs={12} md={2}>
              <h3 className="search-result-header">Filter</h3>
                <DatePicker
                  selected={this.state.startDate}
                  selectsStart  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleDateChange('startDate')} />
                  <p className="sidebar-to">to</p>
                <DatePicker
                  selected={this.state.endDate}
                  selectsEnd  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleDateChange('endDate')} />
                  <FormControl className="sidebar-select" value={this.state.display} onChange={this.handleChange('display')} componentClass="select" placeholder="type">
                    <option value="all">All</option>
                    <option value="active">Not Completed</option>
                    <option value="completed">Completed</option>
                  </FormControl>
                  <Button className="sidebar-btn" onClick={this.handleSearch}>Search</Button>
              <Nav {...style({marginTop:'50px'})} bsStyle="pills" stacked>
                <NavItem className="add-btn"><Link to="/manage/todos/add">Add Todo</Link></NavItem>
              </Nav>
            </Col>
            <Col xs={12} md={10}>
              <h3 className="search-result-header">Results</h3>
              <Accordion>
                {todos.map(results)}
              </Accordion>
            </Col>
          </Row>
          {/* <pre>
            {JSON.stringify(this.state,null,2)}
          </pre> */}
        </PageWrapper>
      </div>
    )
  }
})

export default ListEvents
