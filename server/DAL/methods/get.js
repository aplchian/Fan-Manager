const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load();
const db = new PouchDB(process.env.DB_URL)


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

function getDocPromise(doc){
  return db.get(doc)
}

function getEvent(doc){
  return getDocPromise(doc)
}

function getDaySheet(doc){
  return getDocPromise(doc)
}

function getTodo(doc){
  return getDocPromise(doc)
}

module.exports = {
  fan: getFan,
  event: getEvent,
  daysheet: getDaySheet,
  todo: getTodo
}
