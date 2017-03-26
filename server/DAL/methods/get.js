const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load()
const {curry} =  require('ramda')
const db = new PouchDB(process.env.DB_URL)

const getDoc = (doc) => db.get(doc)

module.exports = {
  fan: getDoc,
  event: getDoc,
  daysheet: getDoc,
  todo: getDoc,
  band: getDoc,
  user: getDoc,
}
