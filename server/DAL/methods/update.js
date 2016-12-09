const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load();
const db = new PouchDB(process.env.DB_URL)
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
  update(doc,cb)
}

function updateEvent(doc,cb){
  update(doc,cb)
}

function updateDaySheet(doc,cb){
  update(doc,cb)
}

function updateTodo(doc,cb){
  update(doc,cb)
}


module.exports = {
  fan: updateFan,
  event: updateEvent,
  daysheet: updateDaySheet,
  todo: updateTodo

}
