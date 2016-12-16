const {filter, map, forEach,flatten,uniq,compose,pathOr} = require('ramda')
const PouchDB = require('pouchdb')
const db = new PouchDB('http://localhost:5984/slo-new/')
const sheets = require('./sheets')
const $ = require('jquery')

var emails = []

const appendId = function(item){
  item._id = item.state+"_"+item.email
  return item
}

function loadEmails(){

  const convertObj = function(item){
  if(item['gsx$state']['$t'] === '') delete ['gsx$state']['$t']
  if(item['gsx$emailaddress']['$t'] === "") delete item['gsx$emailaddress']['$t']
  if(item['gsx$city']['$t'] === '') delete item['gsx$city']['$t']
  if(item['gsx$submittedon']['$t'] === '') delete item['gsx$submittedon']['$t']

  var joinDate = pathOr('N/A',['gsx$submittedon','$t'],item) === 'N/A' ? new Date() : new Date(pathOr('N/A',['gsx$submittedon','$t'],item))

  return {
    email: pathOr('N/A',['gsx$emailaddress','$t'],item),
    state: pathOr('N/A',['gsx$state','$t'],item),
    city: pathOr('N/A',['gsx$city','$t'],item),
    join: joinDate.toISOString(),
    f_name: pathOr('N/A',['gsx$name','$t'],item).split(' ')[0],
    l_name: pathOr('N/A',['gsx$name','$t'],item).split(' ')[1] === undefined ? 'N/A' : pathOr('N/A',['gsx$name','$t'],item).split(' ')[1],
    streetteam: false
  }
}


  const getData = function(url){
    $.getJSON(url, function(data){
      emails.push(map(function(item){
        return convertObj(item)
      },data.feed.entry))
    });
  }

  forEach(getData,sheets.links)

}

function sync(cb){

  var status

  const emailsUniq = compose(
    map(appendId),
    filter(item => item.email.length !== 0),
    // uniq,
    flatten
  )(emails)
  emails = emailsUniq

  db.bulkDocs(emailsUniq).then(function(res){
    console.log('dBSync success')
    return 'success'
  }).catch(function(err){
    console.log('dbSync fail')
    return 'fail'
  })

}

module.exports = {
  load: loadEmails,
  sync: sync
}
