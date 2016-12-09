const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load();
const db = new PouchDB(process.env.DB_URL)


function remove(doc,cb){
  db.get(doc, {
    include_docs: true
  },function(err,body){
    if (err){
      return cb(err)
    }
    if(body){
      db.remove(body,function(err,body){
        if(err){
          return cb(err)
        }
        if(body){
          return cb(null,body)
        }
      })
    }
  })
}

function removeFan(doc,cb){
  remove(doc,cb)
}

function removeEvent(doc,cb){
  remove(doc,cb)
}

function removeDaysheet(doc,cb){
  remove(doc,cb)
}

module.exports = {
  fan: removeFan,
  event: removeEvent,
  daysheet: removeDaysheet
}
