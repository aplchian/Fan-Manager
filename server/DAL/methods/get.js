const PouchDB = require('pouchdb')
const db = new PouchDB('http://localhost:5984/slo-new/')


function getDoc(doc, cb) {
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

function getFan(doc,cb){
  getDoc(doc,cb)
}

module.exports = {
  fan: getFan
}
