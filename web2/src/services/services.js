const React = require('react')
const xhr = require('xhr')
const url = process.env.REACT_APP_XHR
const {pluck,map} = require('ramda')

const Service = Component => React.createClass({
  fansByState(state,cb){
    console.log('state',state)
    xhr.get(`${url}fans/state/${state}`,{json: true},(err,res,body) => {
      if(err) return cb(err)
      return cb(null,map(item => item.doc,body.rows))
    })
  },
  allFans(cb){
    xhr.get(`${url}fans`,{json: true},(err,res,body) => {
      if(err) return cb(err)
      return cb(null,map(item => item.doc,body))
    })
  },
  streetTeam(cb){
    xhr.get(`${url}streetteam`,{json: true},(err,res,body) => {
      if(err) return cb(err)
      return cb(null,map(item => item.doc,body))
    })
  },
  addFan(doc,cb){
    xhr.post(`${url}fans`,{json: doc},(err,res,body) => {
      if(err) return cb(err)
      return cb(null,body)
    })
  },
  render(){
    return <Component
      {...this.props}
      fansByState={this.fansByState}
      allFans={this.allFans}
      streetTeam={this.streetTeam}
      addFan={this.addFan}
    />
  }
})

module.exports = Service
