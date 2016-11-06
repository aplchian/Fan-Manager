const PouchDB = require('pouchdb')
const db = new PouchDB('http://localhost:5984/slo-new/')


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

module.exports = {
  fan: removeFan
}
