import React from 'react'
const h = require('react-hyperscript')
const xhr = require('xhr')
const FanTable = require('./FanTable.js')
const {filter,curry} = require('ramda')
const Xhr = require('./Xhr')

const filterFans = function(state,item){
  return (item.doc.state === state)
}

const curryFilterFans = curry(filterFans)

const StreetTeam = React.createClass({
  getInitialState: function(){
    return ({
      data: []
    })
  },
  componentDidMount: function(){
    xhr({
        method: 'GET',
        url: `${this.props.xhrUrl}/streetteam`,
        json: true
    }, (err, res) => {
        if (err) {
            console.log(err.message)
        }
        if (res) {
          this.setState({
            data: res.body
          })
        }
    })
  },
  updateQuery: function(e) {
      this.setState({
          q: e.target.value.toUpperCase(),
          data: this.state.data
      })
  },
  stateSearch: function(e){
    e.preventDefault()
    if(this.state.q.length === 0){
      this.state
      this.setState({
        data: this.state.data
      })
    }else {
      var fans = filter(curryFilterFans(this.state.q),this.state.data)
      this.setState({
        data: this.state.data,
        filteredData: fans,
        q: this.state.q
      })
    }
  },
  clearFiltered: function(){
    this.setState({
      data: this.state.data,
    })
  },
  render: function(){
    var table
    if(!this.state.filteredData){
      table = <FanTable data={this.state.data}/>
    }
    else{
      table = <FanTable data={this.state.filteredData}/>
    }
    return (
      <div className="container">
      <div className="search-container">
        <form onSubmit={this.stateSearch}>
          <input
          className="search-input"
          placeholder="Street Team..."
          onChange={this.updateQuery}
          />
          <button onClick={this.stateSearch}>search</button>
        </form>
      </div>
        {table}
      </div>
    )
  }
})

module.exports = Xhr(StreetTeam)
