const React = require('react')
const {style} = require('glamor')
const PageWrapper = require('../page-wrapper.js')
const TableRow = require('./components/table-row.js')


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
      q: ''
    })
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
  },
  render(){
    const searchType = this.props.params.type === 'search' ? 'Fan' : 'Street Team'
    return(
      <div>
          <PageWrapper>
            <div>
              <h2>{searchType} Search</h2>
              <form>
                <label>Search By</label>
                <select onChange={this.handleChange('searchtype')}>
                  <option value="email">Email</option>
                  <option value="state">State</option>
                  <option value="city">City</option>
                </select>
              </form>
              <form onSubmit={this.handleSubmit}>
                <input {...inputStyle} type="text" value={this.state.q} onChange={this.handleChange('q')}/>
                <button {...buttonStyle}>Search</button>
              </form>
              <table {...tableStyle}>
                <tr>
                  <th>state</th><th>city</th><th>first</th><th>last</th><th>email</th>
                </tr>
                <TableRow
                  state="SC"
                  city="Charleston"
                  fname="alex"
                  lname="boquist"
                  email="alex@aplchianmedia.com"
                />
              </table>
              <pre>
                {JSON.stringify(this.state, null, 2)}
              </pre>
            </div>
          </PageWrapper>
      </div>
   )
  }
})


module.exports = Dashboard
