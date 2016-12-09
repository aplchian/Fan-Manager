const PouchDB = require('pouchdb')
const db = new PouchDB('https://aplchian:Server363375@aplchian.cloudant.com/slo')
const {pluck,map,forEach,filter,reject} = require('ramda')


db.allDocs({
  include_docs: true,
  startkey: 'fan_',
  endkey: 'fan_\uffff'
})
  .then(res => pluck(('doc'),res.rows))
  .then(res => reject(item => item.type,res))
  .then(res => map(item => {
    item.type = "fan"
    return item
  },res))
  .then(res => {
    forEach(item => {
      db.put(item)
        .then(res => console.log(res))
        .catch(err => console.log(err.message))
    },res)
  })
