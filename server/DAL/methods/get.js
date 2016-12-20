const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load();
const db = new PouchDB(process.env.DB_URL)

function getDoc(doc){
  return db.get(doc)
}

function getFan(doc){
  return getDoc(doc)
}

function getEvent(doc){
  return getDoc(doc)
}

function getDaySheet(doc){
  return getDoc(doc)
}

function getTodo(doc){
  return getDoc(doc)
}

module.exports = {
  fan: getFan,
  event: getEvent,
  daysheet: getDaySheet,
  todo: getTodo
}
