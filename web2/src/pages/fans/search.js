const React = require('react')
const {style} = require('glamor')
const PageWrapper = require('./components/page-wrapper.js')
const TableRow = require('./components/table-row.js')
const PageTitle = require('../components/page-header.js')
import {Button,FormControl,FieldGroup,FormGroup,Form,Table} from 'react-bootstrap'
import FanSearchBar from './components/fan-search-bar'
import SearchResultsTable from './components/search-results-table'
import {buildMailChimp} from './helpers/helpers'
import {pluck,last,prop,propEq,filter,propSatisfies,splitEvery,head,inc,dec,flatten} from 'ramda'
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
      results: [],
      artist: this.props.band,
      limit: 10,
      sortToken: '',
      sortPlace: 0,
      mailchimp: false,
      success: false,

    })
  },
  componentDidMount(){
    if(this.props.params.type === 'search'){
      let options = {
        state: '',
        bandID: this.state.artist,
        sorttoken: '',
        limit: ''
      }
      this.props.fansByState(options)
        .then(res =>  {
          console.log('date',res.data)
          this.setState({
            data: res.data,
            results: splitEvery(this.state.limit,res.data)
          })
        }
      )
    }else if(this.props.params.type === 'streetteam'){
      this.props.streetTeam(this.state.artist)
        .then(res => {
          this.setState({
            data: pluck('doc',res.data),
            results: splitEvery(this.state.limit,pluck('doc',res.data))
          })
        })
    }
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.params.type === 'search'){
      let options = {
        state: '',
        bandID: this.state.artist,
        sorttoken: '',
        limit: ''
      }
      this.props.fansByState(options)
        .then(res =>  {
          this.setState({
            data: res.data,
            results: splitEvery(this.state.limit,res.data)
          })
        }
      )
    }else if(nextProps.params.type === 'streetteam'){
      this.props.streetTeam(this.state.artist)
        .then(res => {
          this.setState({
            data: pluck('doc',res.data),
            results: splitEvery(this.state.limit,pluck('doc',res.data))
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
      let q = this.state.q.toUpperCase()
      let data = filter(propSatisfies(x => x.toUpperCase() === q,this.state.searchtype),this.state.data)
      this.setState({
        results: splitEvery(this.state.limit,data),
        sortPlace: 0
      })
  },
  syncMailChimp(e){
    e.preventDefault()
    let data = buildMailChimp(flatten(this.state.results))
    this.props.syncMailChimp(data)
      .then(res => this.setState({
        success: true,
        mailchimp: true
      }))
      .catch(err => this.setState({
        success: true,
        mailchimp: false
      }))
  },
  pageForward(e){
    e.preventDefault()
    if(this.state.results.length > this.state.sortPlace){
      this.setState({
        sortPlace: inc(this.state.sortPlace)
      })
    }
  },
  pageBackward(e){
    e.preventDefault()
    if(this.state.sortPlace !== 0){
      this.setState({
        sortPlace: dec(this.state.sortPlace)
      })
    }
  },
  render(){

    let currentList = this.state.results.length > 0
      ? this.state.results[this.state.sortPlace]
      : []

    let prevButton = this.state.sortPlace !== 0
      ? <Button className="pull-left" onClick={this.pageBackward}>prev</Button>
      : null

    let nextButton = this.state.results.length > this.state.sortPlace + 1
      ? <Button className="pull-right" onClick={this.pageForward}>next</Button>
      : null


    const searchType = this.props.params.type === 'search' ? 'Fans' : 'Street Team'

    const resultCount = this.state.results.length > 0
    ? <div className="current-page" ><span>{this.state.sortPlace + 1} of {this.state.results.length}</span></div>
    : null
    const MailChimpButton = this.state.results.length > 0
    ? <div className="sync-mailchimp" onClick={this.syncMailChimp}>Sync to Mailchimp</div>
    : null

    const Alert = ({message,show,success}) => {
      if(show){
        return success === "true"
                 ? <div className="alert-container success animated slideInDown">{message} <span onClick={() => this.setState({success: false})} id="alert-exit-btn">x</span></div>
                 : <div className="alert-container failure animated slideInDown">{message} <span id="alert-exit-btn">x</span></div>
      }else {
        return null
      }
    }


    return(
      <div>
        <Alert success={"true"} show={this.state.success} message="Fans Synced with MailChimp!" />
        <PageWrapper logout={this.props.logOut} title={`Search ${searchType}`}>
          <Row>
            <Col xs={12} md={2} className="search-sidebar fan-select">
              <h3 className="search-result-header">Options</h3>
              <FanSearchBar
                className="fan-select"
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                q={this.state.q}
               />
            </Col>
            <Col xs={12} md={10} className="search-results">
              <div className="table-header"><h3 className="search-result-header">Results</h3> <span className="table-header" >{flatten(this.state.results).length} Fans Found</span> </div>
              {resultCount}
              <SearchResultsTable results={currentList} />
              <div className="table-btn-contain clearfix">
                {prevButton}
                {nextButton}
              </div>
              {MailChimpButton}
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


module.exports = Dashboard
