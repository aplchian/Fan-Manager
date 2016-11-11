const path = require('path')
const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load();
const db = new PouchDB(process.env.DB_URL)
const {
    prop,
    forEach
} = require('ramda')
const create = require('./methods/createFan.js')
const update = require('./methods/update.js')
const remove = require('./methods/remove.js')
const getThe = require('./methods/get.js')





function listFansByState(startToken, limit, cb) {
    db.allDocs({
        startkey: `fan_${startToken}`,
        endkey: `fan_${startToken}\uffff`,
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
    getFan: getThe.fan,
    updateFan: update.fan,
    removeFan: remove.fan,
    createFan: create.fan,
    listStreetTeam: queryDB,
}
