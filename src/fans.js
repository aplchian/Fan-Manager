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
const FanRow = require('./components/FanRow.js')
const FanTable = require('./components/FanTable.js')

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
        console.log('ho')
        e.preventDefault()
        xhr({
            method: 'GET',
            url: `http://localhost:3039/fans/${this.state.q}`,
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
        return (
            h("div", [
                h("h3.tc", `Fans`),
                h("form", {
                    onSubmit: this.stateSearch
                }, [
                    h("input.center.db", {
                        onChange: this.updateQuery,
                        className: "center db"
                    })
                ]),
                h(FanTable,{
                  data: this.state.data
                })
            ])
        )
    }
})
