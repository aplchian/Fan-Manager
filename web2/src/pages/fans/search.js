const React = require('react')
const {style} = require('glamor')
const PageWrapper = require('../page-wrapper.js')
const TableRow = require('./components/table-row.js')
const { Scrollbars } = require('react-custom-scrollbars')
const Button = require('../components/submit-button')
const PageTitle = require('../components/page-header.js')



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
    console.log(nextProps)
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
    const buildJson = function(item){
      return {
        "method": "POST",
        "path": "lists/22bc951064/members/",
        "body": "{\"email_address\":\"" + item.email + "\",\"status\":\"subscribed\",\"merge_fields\":{\"MMERGE3\":\"" + item.state + "\",\"MMERGE4\":\""+ item.city +"\"}}"
      }
    }
    let data = this.state.data.map(buildJson)
    this.props.syncMailChimp(data, (err,res) => {
      if(err) return console.log(err)
      return console.log(res)
    })
  },
  render(){
    console.log(this.state)
    const row = (item, i) => (
      <TableRow
        key={i}
        state={item.state}
        city={item.city}
        fname={item.f_name}
        lname={item.l_name}
        email={item.email}
        id={item._id}
      />
    )
    const searchType = this.props.params.type === 'search' ? 'Fan' : 'Street Team'
    const tableHeader = this.state.data.length > 0
      ? <tr><th>state</th><th>city</th><th>first</th><th>last</th><th>email</th></tr>
      : null
    const resultCount = this.state.data.length > 0
    ? <tr><td>{this.state.data.length} Fans Found</td></tr>
    : null
    return(
      <div>
          <PageWrapper>
            <div>
              <PageTitle to="Search"/>
              <form>
                <label>Search By</label>
                <select onChange={this.handleChange('searchtype')}>
                  <option value="email">Email</option>
                  <option value="state">State</option>
                  <option value="city">City</option>
                  <option value="l_name">Last Name</option>
                </select>
              </form>
              <form onSubmit={this.handleSubmit}>
                <input {...inputStyle} type="text" value={this.state.q} onChange={this.handleChange('q')}/>
                <button {...buttonStyle}>Search</button>
              </form>
              {resultCount}
              <Scrollbars
                autoHeight
                autoHeightMin={100}
                autoHeightMax={350}
                style={{marginTop: 30, backgroundColor: 'white' }}>

                <table {...tableStyle}>
                  {tableHeader}
                  {this.state.data.map(row)}
                </table>


              </Scrollbars>

              <Button onClick={this.syncMailChimp} text="sync to mailchimp" />
            </div>
          </PageWrapper>
      </div>
   )
  }
})


module.exports = Dashboard
