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
      artist: "band_Stop_Light_Observations",
      limit: 10,
      sortToken: '',
      sortPlace: 0
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
      let q = this.state.q.toUpperCase()
      let data = filter(propSatisfies(x => x.toUpperCase() === q,this.state.searchtype),this.state.data)
      console.log('data',data)
      this.setState({
        results: splitEvery(this.state.limit,data),
        sortPlace: 0
      })
  },
  syncMailChimp(e){
    e.preventDefault()
    let data = buildMailChimp(this.state.data)
    this.props.syncMailChimp(data)
      .then(res => console.log(res))
  },
  pageForward(e){
    e.preventDefault()
    console.log('results length',this.state.results.length,'sortPlace',this.state.sortPlace)
    if(this.state.results.length > this.state.sortPlace){
      this.setState({
        sortPlace: inc(this.state.sortPlace)
      })
    }
  },
  pageBackward(e){
    e.preventDefault()
    console.log('results length',this.state.results.length,'sortPlace',this.state.sortPlace)
    if(this.state.sortPlace !== 0){
      this.setState({
        sortPlace: dec(this.state.sortPlace)
      })
    }
  },
  render(){
    console.log(this.state)

    let currentList = this.state.results.length > 0
      ? this.state.results[this.state.sortPlace]
      : []

    let prevButton = this.state.sortPlace !== 0
      ? <Button className="pull-left" onClick={this.pageBackward}>Prev</Button>
      : null

    let nextButton = this.state.results.length > this.state.sortPlace
      ? <Button className="pull-right" onClick={this.pageForward}>Next</Button>
      : null


    const searchType = this.props.params.type === 'search' ? 'Fans' : 'Street Team'
    const resultCount = this.state.results.length > 0
    ? <tr><td>{flatten(this.state.results).length} Fans Found -- {this.state.sortPlace + 1} of {this.state.results.length}</td></tr>
    : null
    const MailChimpButton = this.state.results.length > 0
    ? <Button onClick={this.syncMailChimp}>Sync to Mailchimp</Button>
    : null


    return(
      <div>
        <PageWrapper title={`Search ${searchType}`}>
          <Row>
            <Col xs={12} md={2} >
              <PageTitle to="Search"/>
              <FanSearchBar
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                q={this.state.q}
               />
            </Col>
            <Col xs={12} md={10} >
              {resultCount}
              <SearchResultsTable results={currentList} />
              {prevButton}
              <Button onClick={this.pageForward}>Next</Button>
              {MailChimpButton}
            </Col>
          </Row>
          {/* {JSON.stringify(this.state,null,2)} */}
        </PageWrapper>

      </div>
   )
  }
})


module.exports = Dashboard
