const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load();
const db = new PouchDB(process.env.DB_URL)
const {
    prop,
    forEach
} = require('ramda')
const buildFan = require('../helpers/buildFan.js')


function createFan(doc, cb) {
    var hasKeys = true
    var status = ''
    const keys = ['email']

    function missingKey(item) {
        if (prop(item)(doc) === undefined) {
            hasKeys = false
            status = item
        }
    }

    forEach(missingKey, keys)

    if (!hasKeys) {
        return cb(new Error(`400Missing ${status} property within data`))
    }

    if (prop('_rev')(doc)) {
        return cb(new Error('400 _rev not allowed'))
    }

    if (prop('_id')(doc)) {
        return cb(new Error('400 _id not allowed'))
    }

    doc = buildFan(doc)
    db.put(doc, function(err, res) {
        if (err) {
            console.log(err.message)
            //checks to see if that ID exist in db
            db.get(doc._id,{
              include_docs: true
            },function(err,res){
              console.log('response',res)
              // if doesn't exist call cb with error
              if(err){
                return cb(err, null)
              }
              //  if does exist, set current rev to doc and put updated doc
              if(res){
                doc._rev = res._rev
                db.put(doc,function(err,res){
                  if(err){
                    return cb(err)
                  }
                  if(res){
                    return cb(null,res)
                  }
                })
              }
            })
        }
        if (res) {
            cb(null, res)
        }
    })
}

function createEvent(doc, cb) {
    var hasKeys = true
    var status = ''
    const keys = ['name','type']

    function missingKey(item) {
        if (prop(item)(doc) === undefined) {
            hasKeys = false
            status = item
        }
    }

    forEach(missingKey, keys)
    console.log('doc',doc)

    if (!hasKeys) {
        return cb(new Error(`400Missing ${status} property within data`))
    }

    if (prop('_rev')(doc)) {
        return cb(new Error('400 _rev not allowed'))
    }

    if (prop('_id')(doc)) {
        return cb(new Error('400 _id not allowed'))
    }

    let date = doc.date.split('T')[0]
    doc._id = `event_${date}_${doc.type}_${doc.name}`
    delete doc.newevent
    delete doc.newcontact
    db.put(doc, (err,res) => {
      if(err) return cb(err)
      return cb(null,res)
    })
}

module.exports = {
  fan: createFan,
  event: createEvent
}
