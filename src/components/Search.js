import React from 'react'
const xhr = require('xhr')
const {
    map
} = require('ramda')
const {
  Router,
  Route,
  hashHistory,
  Link
} = require('react-router')
const h = require('react-hyperscript')
const FanRow = require('./FanRow.js')
const FanTable = require('./FanTable.js')

export default React.createClass({
    getInitialState: function() {
        return ({
            q: '',
            data: []
        })
    },
    updateQuery: function(e) {
        this.setState({
            q: e.target.value.toUpperCase()
        })
    },
    stateSearch: function(e) {
        e.preventDefault()
        xhr({
            method: 'GET',
            url: `http://alexboquist.com:3039/fans/${this.state.q}`,
            json: true
        }, (err, res) => {
            if (err) {
                console.log(err.message)
            }
            if (res) {
                this.setState({
                    q: this.state.q,
                    data: res.body.rows
                })
            }
        })
    },
    render: function() {
      const tr = function(item){
        return <FanRow data={item.doc}/>
      }
      if(this.state.data.length > 1){
        var table = <div>
        <span id="fans-in">Fans in {this.state.data[0].doc.state}: {this.state.data.length}</span>
        <FanTable data={this.state.data} />
        </div>
      }
        return (
          <div className="container">
            <div className="search-container">
              <form onSubmit={this.stateSearch}>
                <input
                className="search-input"
                placeholder="enter state.."
                onChange={this.updateQuery}
                />
                <button onClick={this.stateSearch}>search</button>
              </form>
            </div>
            <div className="search-results">
              {table}
            </div>
          </div>
        )
    }
})
