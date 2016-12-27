const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load()
const {curry} = require('ramda')
const db = new PouchDB(process.env.DB_URL)

const rm = curry((db,doc) => {
  return db.get(doc, {include_docs: true})
    .then(res => db.remove(res))
    .then(res => res)
})

module.exports = {
  fan: rm(db),
  event: rm(db),
  daysheet: rm(db),
  todo: rm(db)
}
