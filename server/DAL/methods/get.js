const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load()
const {curry} =  require('ramda')
const db = new PouchDB(process.env.DB_URL)

const f = curry((db,doc) => db.get(doc))

module.exports = {
  fan: f(db),
  event: f(db),
  daysheet: f(db),
  todo: f(db),
  band: f(db),
  user: f(db),
}
