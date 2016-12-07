const React = require('react')
const {style} = require('glamor')
const PageWrapper = require('./components/page-wrapper.js')
const TableRow = require('./components/table-row.js')
const PageTitle = require('../components/page-header.js')
import {Button,FormControl,FieldGroup,FormGroup,Form,Table} from 'react-bootstrap'
import FanSearchBar from './components/fan-search-bar'
import SearchResultsTable from './components/search-results-table'
import {buildMailChimp} from './helpers/helpers'
import {Row, Col} from 'react-bootstrap'


const inputStyle = style({
  border: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.50)',
  height: '49px',
  width: '90%',
  fontFamily: 'BebasNeueBold',
  fontSize: '45px',
  color: '#7A7A7A',
  letterSpacing: '1.39px',
  margin: '20px 0 0 0'
})

const buttonStyle = style({
  height: 37,
  width: '9%',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer'
})

const tableStyle = style({
  width: '100%',
  marginTop: 30,
  textAlign: 'center',
  verticalAlign: 'middle'
})


const Dashboard = React.createClass({
  getInitialState(){
    return({
      searchtype: 'email',
      q: '',
      data: [],
      allFans: []
    })
  },
  componentDidMount(){
    if(this.props.params.type === 'search'){
      this.props.allFans((err,res) => {
        if(err) return console.log(err)
        return this.setState({allFans: res})
      })
    }else if(this.props.params.type === 'streetteam'){
      this.props.streetTeam((err,res) => {
        if(err) return console.log(err)
        return this.setState({
          allFans: res,
          data: res
        })
      })
    }
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.params.type === 'search'){
      this.props.allFans((err,res) => {
        if(err) return console.log(err)
        return this.setState({
          allFans: res,
          data: [],
          q: ''
        })
      })
    }else if(nextProps.params.type === 'streetteam'){
      this.props.streetTeam((err,res) => {
        if(err) return console.log(err)
        return this.setState({
          allFans: res,
          data: res,
          q: ''
        })
      })
    }
  },
  handleChange(path){
    return e => {
      let current = this.state
      current[path] = e.target.value
      this.setState(current)
    }
  },
  handleSubmit(e){
    e.preventDefault()
    if(this.state.searchtype === 'state'){
      let q = this.state.q
      let data = this.state.allFans.filter(fan => q.toUpperCase() === fan.state.toUpperCase())
      this.setState({data: data})
    }else if(this.state.searchtype === 'email'){
      let q = this.state.q
      let data = this.state.allFans.filter(fan => q.toUpperCase() === fan.email.toUpperCase())
      this.setState({data: data})
    }else if(this.state.searchtype === 'city'){
      let q = this.state.q
      let data = this.state.allFans.filter(fan => q.toUpperCase() === fan.city.toUpperCase())
      this.setState({data: data})
    }else if(this.state.searchtype === 'l_name'){
      let q = this.state.q
      let data = this.state.allFans.filter(fan => q.toUpperCase() === fan.l_name.toUpperCase())
      this.setState({data: data})
    }
  },
  syncMailChimp(e){
    e.preventDefault()
    let data = buildMailChimp(this.state.data)
    this.props.syncMailChimp(data)
      .then(res => console.log(res))
  },
  render(){

    const searchType = this.props.params.type === 'search' ? 'Fans' : 'Street Team'
    const resultCount = this.state.data.length > 0
    ? <tr><td>{this.state.data.length} Fans Found</td></tr>
    : null
    const MailChimpButton = this.state.data.length > 0
    ? <Button onClick={this.syncMailChimp}>Sync to Mailchimp</Button>
    : null


    return(
      <div>
        <PageWrapper title={`Search ${searchType}`}>
          <Row>
            <Col xs={12} md={4} >
              <PageTitle to="Search"/>
              <FanSearchBar
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                q={this.state.q}
               />
            </Col>
            <Col xs={12} md={8} >
              {resultCount}
              <SearchResultsTable results={this.state.data} />
              {MailChimpButton}
            </Col>
          </Row>
        </PageWrapper>

      </div>
   )
  }
})


module.exports = Dashboard
