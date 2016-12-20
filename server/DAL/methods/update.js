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
    return db.put(doc)
}

function updateFan(doc){
  return update(doc)
}

function updateEvent(doc){
  return update(doc)
}

function updateDaySheet(doc){
  return update(doc)
}

function updateTodo(doc){
  return update(doc)
}


module.exports = {
  fan: updateFan,
  event: updateEvent,
  daysheet: updateDaySheet,
  todo: updateTodo

}
