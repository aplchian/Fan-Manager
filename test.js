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
  "_id": "AK_alex.boquis23@gmail.com",
  "_rev": "3-e8f69aadb0b0bb4be13411817f73a6bd",
  "email": "alex.boquis23@gmail.com",
  "f_name": "alexander",
  "l_name": "boquist",
  "state": "AK",
  "city": "sds",
  "join": "2016-11-06T03:06:47.042Z",
  "streetteam": false
}

dal.getFan('AK_enmoorejr@gmail.com',cb)

// dal.createFan(list,cb)
