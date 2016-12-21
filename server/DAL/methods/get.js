const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load()
const {curry} =  require('ramda')
const db = new PouchDB(process.env.DB_URL)

const getDoc = curry((db,doc) => db.get(doc))

module.exports = {
  fan: getDoc(db),
  event: getDoc(db),
  daysheet: getDoc(db),
  todo: getDoc(db),
  band: getDoc(db),
  user: getDoc(db),
}
