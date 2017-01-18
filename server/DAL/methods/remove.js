const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load()
const {curry: C} = require('ramda')
const db = new PouchDB(process.env.DB_URL)

const remove = C((db,doc) => {
  return db.get(doc, {include_docs: true})
    .then(res => db.remove(res))
    .then(res => res)
})

module.exports = {
  fan: remove(db),
  event: remove(db),
  daysheet: remove(db),
  todo: remove(db)
}
