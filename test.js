const PouchDB = require('pouchdb')
const db = new PouchDB('http://aplchian:alex363375@localhost:5984/slo-new/')
const dal = require('./server/DAL/no-sql.js')

var cb = function(err,res){
  if(err){
    return console.log(err.message)
  }
  if(res){
    return console.log(res)
  }
}

var list = {
    _id: "_design/streetteam",
    views: {
        streetteam: {
            map: function(doc) {
                if (doc.streetteam) {
                    emit(doc._id)
                }
            }.toString()
        }
    }
}

var fan = {
  fname: 'alex',
  lname: 'boquist',
  state: 'AK',
  city: 'Charleston',
  streetteam: true,
}

dal.listStreetTeam('streetteam',cb)

// dal.createFan(list,cb)
