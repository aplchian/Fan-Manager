const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load();
const db = new PouchDB(process.env.DB_URL)

function getDoc(doc){
  return db.get(doc)
}

function fan(doc){
  return getDoc(doc)
}

function event(doc){
  return getDoc(doc)
}

function daysheet(doc){
  return getDoc(doc)
}

function todo(doc){
  return getDoc(doc)
}

function band(doc){
  return getDoc(doc)
}

module.exports = {
  fan,
  event,
  daysheet,
  todo,
  band
}
