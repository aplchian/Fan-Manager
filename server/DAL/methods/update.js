const PouchDB = require('pouchdb')
const db = new PouchDB('http://localhost:5984/slo-new/')
const {
    prop,
    forEach
} = require('ramda')


function update(doc, cb) {
    if (prop('_rev')(doc) === undefined || prop('_id')(doc) === undefined) {
        return cb(new Error('400 _rev or _id is missing'))
    }
    db.put(doc, function(err, res) {
        if (err) {
            return cb(err)
        }
        if (res) {
            return cb(null, res)
        }
    })
}

function updateFan(doc,cb){
  console.log(doc)
  update(doc,cb)
}


module.exports = {
  fan: updateFan
}
