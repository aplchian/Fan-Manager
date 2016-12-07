import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel} from 'react-bootstrap'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
const db = new PouchDB('slo-dev')
import {filter} from 'ramda'


const container = style({
  display: 'block',
  margin: "0 auto"
})

const sideBarStyle = style({
  // border: '1px solid gray',
  borderRadius: '4px',
  textAlign: 'center',
  paddingBottom: '40px'
})

const mainSectionStyle = style({
  // textAlign: 'center',
  // border: '1px solid gray',
  paddingLeft: 30,
  padding: '0 0 40px 0'

})

const ListEvents = React.createClass({
  getInitialState(){
    return({
      filter: '',
      filterkey: 0,
      data: [],
      results: []
    })
  },
  componentDidMount(){
    db.allDocs({
      include_docs: true,
      startkey: 'event_',
      endkey: 'event_\uffff'
    }).then(data => this.setState({data: data.rows}))
      .catch(err => console.log(err.message))
  },
  handleSelect(type){
    const filterData = type => {
      return item => {
        return item.doc.type === type
      }
    }
    let results = filter(filterData(type),this.state.data)
    this.setState({
      filter: type,
      results
     })
  },
  render(){
    const results = (item,i) => {
      let date = item.doc.date.split('T')[0]
      return <Panel key={i}>{item.doc.name} {date} {item.doc.city},{item.doc.state}</Panel>
    }
    return(
      <div>
        <PageWrapper>
          <h1>Events</h1>
          <Row {...container} className="show-grid">
            <Col {...sideBarStyle} xs={12} md={4}>
              <h3>Filter</h3>
              <Nav bsStyle="pills" stacked activeKey={this.state.filter} onSelect={this.handleSelect}>
                <NavItem eventKey={'show'}>Shows</NavItem>
                <NavItem eventKey={'press'} title="Item">Press</NavItem>
                <NavItem eventKey={'other'}>Other</NavItem>
              </Nav>
            </Col>
            <Col {...mainSectionStyle} xs={12} md={8}>
              <h3>Results</h3>
              {this.state.results.map(results)}
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
