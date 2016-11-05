const path = require('path')
const PouchDB = require('pouchdb')
const db = new PouchDB('http://localhost:5984/slo-new/')
const {
    prop,
    forEach
} = require('ramda')
const createFan = require('./methods/createFan.js')


function listFansByState(startToken, limit, cb) {
    db.allDocs({
        startkey: startToken,
        endkey: `${startToken}\uffff`,
        limit: limit,
        include_docs: true
    }, function(err, res) {
        if (err) {
            return cb(err)
        }
        if (res) {
            return cb(null, res)
        }
    })
}

function getFan(doc, cb) {
    db.get(doc, {
        include_docs: true
    }, function(err, res) {
        if (err) {
            return cb(console.log(err))
        }
        if (res) {
            return cb(null, res)
        }
    })
}

function queryDB(view,cb){
  var options = {
    include_docs: true
  }
  db.query(view,options,function(err,body){
    if(err){
      return cb(err)
    }
    if(body){
      return cb(null,body.rows)
    }
  })
}





module.exports = {
    fansByState: listFansByState,
    fan: getFan,
    createFan: createFan.createFan,
    listStreetTeam: queryDB
}
