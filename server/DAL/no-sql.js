const path = require('path')
const PouchDB = require('pouchdb')
var dotenv = require('dotenv');
dotenv.load();
const db = new PouchDB(process.env.DB_URL)
const {prop,forEach,inc,tail,pluck,curry} = require('ramda')
const create = require('./methods/create.js')
const update = require('./methods/update.js')
const remove = require('./methods/remove.js')
const getThe = require('./methods/get.js')
const queryDateRange = require('./helpers/queryDateRange')


function listFansByState({sortToken,bandId,state,limit}, cb) {
  hasSortToken = sortToken === '' ? false : true
  let options = {
      startkey: [bandId,state,sortToken],
      endkey: [bandId,`${state}\uffff`],
      include_docs: true
  }
    db.query('artistfans', options, function(err, res) {
        if (err) {
            return cb(err)
        }
        if (res) {
          console.log('res',res)
            let data = hasSortToken ? tail(pluck('doc',res.rows)) : pluck('doc',res.rows)
            return cb(null, data)
        }
    })
}


function queryDB(view,options,cb){
  db.query(view,options,function(err,body){
    if(err){
      return cb(err)
    }
    if(body){
      console.log('body',body)
      return cb(null,body.rows)
    }
  })
}

const getDateRange = curry((query,view,{startDate,endDate,artistID},cb) => {
  const options = queryDateRange(startDate,endDate,artistID)
  query(view,options,cb)
})

const getUserBands = curry((query,userID,cb) => {
  let options = {
    startkey: [userID],
    endkey: [`${userID}\uffff`]
  }
  query('userbands',options,cb)
})


module.exports = {
    fansByState: listFansByState,
    getFan: getThe.fan,
    getEvent: getThe.event,
    getDaySheet: getThe.daysheet,
    getBand: getThe.band,
    getUser: getThe.user,
    getTodo: getThe.todo,
    getView: queryDB,
    getArtistEvents: getDateRange(queryDB,'artistevents'),
    getArtistDaySheets: getDateRange(queryDB,'artistdaysheets'),
    getArtistTodos: getDateRange(queryDB,'artisttodos'),
    getUserBands: getUserBands(queryDB),
    updateFan: update.fan,
    updateEvent: update.event,
    updateDaySheet: update.event,
    updateTodo: update.todo,
    removeFan: remove.fan,
    removeEvent: remove.event,
    removeDaySheet: remove.daysheet,
    removeTodo: remove.todo,
    createFan: create.fan,
    listStreetTeam: queryDB,
    createEvent: create.event,
    createDaySheet: create.daysheet,
    createTodo: create.todo,
    createUser: create.user
}
