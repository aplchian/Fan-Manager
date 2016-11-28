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
  getFan(fanId,cb){
    xhr.get(`${url}fans/${fanId}`,{json: true},(err,res,body) => {
      if(err) return cb(err)
      return cb(null,body)
    })
  },
  editFan(doc,cb){
    xhr.put(`${url}fans`,{json: doc},(err,res,body) => {
      if(err) return cb(err)
      return cb(null,body)
    })
  },
  syncMailChimp(doc,cb){
    xhr({
      body: doc,
      url: "https://us3.api.mailchimp.com/3.0/batches",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "apikey f517cf56d577b4ac23c81929c36353fc-us3"
      }
    },(err, res) => {
      if(err) return cb(err)
      return cb(null,res)
    })
  },
  render(){
    return <Component
      {...this.props}
      fansByState={this.fansByState}
      allFans={this.allFans}
      streetTeam={this.streetTeam}
      addFan={this.addFan}
      getFan={this.getFan}
      editFan={this.editFan}
      syncMailChimp={this.syncMailChimp}
    />
  }
})

module.exports = Service
