import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel,Accordion} from 'react-bootstrap'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
import {Link} from 'react-router'
const db = new PouchDB('slo-dev')
import {filter,pluck,reject,tail,length} from 'ramda'
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
      endDate: moment().add(1, 'years'),
      startDate: moment(),
      band: this.props.band,
      display: "active"
    })
  },
  componentDidMount(){
    this.getTodos()
  },
  getTodos(){
    let data = {
      artistId: this.state.band,
      startdate: this.state.startDate.format(),
      enddate: this.state.endDate.format()
    }
    this.props.getArtistTodos(data)
      .then(res => {
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
      currentState[path] = e
      this.setState(currentState)
    }
  },
  removeTodo(id){
    return e => {
      if(confirm('Are you sure you want to delete this todo?')){
        this.props.removeTodo(id)
          .then(res => this.getTodos())
          .catch(err => console.log('error!',err.message))

      }
    }
  },
  render(){
    const results = (item,i) => {
      let date = item.duedate.split('T')[0]
      const assignedTo = item => {
        return (
          <div>{item.user}</div>
        )
      }
      const panelClass = item.completed === "true" ? 'completed-todo' : 'todo'
      const title = <div><FontAwesome name='tasks' /><h4 className="todo-title">{item.title}</h4></div>
      return (
        <Panel className={`${panelClass} panel-todo-body`} header={title} eventKey={i}>
          <div className="todo-content-container">
            <div className="todo-description-container">
              <div className="todo-label">notes / updates:</div>
              <div className="todo-notes">{item.notes}</div>
            </div>
            <div className="todo-edit-btn"><Link to={`/manage/todos/${item._id}/edit`}>Edit</Link></div>
            <div className="remove-todo-btn" onClick={this.removeTodo(item._id)}>delete</div>
            <div className="todo-label">
              {
                length(item.assignedto) > 0
                  ? 'assigned to:'
                  : 'not assigned'
              }
            </div>
            {
              length(item.assignedto) > 0
                ? (
                  <div>
                    <div className="todo-assignedto">{item.assignedto.map(assignedTo)}</div>
                  </div>
                )
                : null
            }
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

    const renderFilter = (filter) => {
      const classes = this.state.display === filter
                        ? "dib mr3 selected"
                        : "dib mr3"
      return (
        <h3 onClick={() => this.handleChange('display')(filter)}  className={classes}>{filter}</h3>
      )
    }

    return(
      <div>
        <PageWrapper logout={this.props.logOut} title="Tasks">
          <div {...style({color: 'white'})} >fix this</div>
          <Row className="show-grid">
            <Col className="search-sidebar" xs={12} md={2}>
              <h3 className="search-result-header">Filter</h3>
                <DatePicker
                  className="date-picker"
                  selected={this.state.startDate}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleDateChange('startDate')} />
                  <p className="sidebar-to">to</p>
                <DatePicker
                  className="date-picker"
                  selected={this.state.endDate}
                  selectsEnd  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleDateChange('endDate')} />
                  <Button className="sidebar-btn" onClick={this.handleSearch}>Search</Button>
              <Nav {...style({marginTop:'50px'})} bsStyle="pills" stacked>
                <div className="add-link"><Link to="/manage/todos/add"> + add task</Link></div>
              </Nav>
            </Col>
            <Col className="search-results" xs={12} md={10}>
              <div className="search-result-header" >
                {renderFilter('active')}
                {renderFilter('completed')}
                {renderFilter('all')}
              </div>
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
