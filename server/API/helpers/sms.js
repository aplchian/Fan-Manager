const { getBand, getUsers } = require('../../DAL/no-sql.js')
const { pluck, reject, forEach, curry } = require('ramda')
var dotenv = require('dotenv')
const moment = require('moment')

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const sendText = curry((body, to) => {
  client.messages.create({
    to,
    from: "+18432024173",
    body,
  }, (err, message) => {
    if(err){
      console.log('ERR sending message',err)
    }else{
      console.log('Message',message)
    }
    console.log(message.sid);
  });
})



module.exports = {
  newEvent
}

function newEvent(event) {

  getBand(event.band)
    .then(({ users }) => {
      return getUsers(users)
    })
    .then(({ rows }) => {
      const users = pluck('doc', rows)
      const numbers = pluck('phone', users)
      const withNumbers = reject((x) => x === undefined, numbers)


      const message = `w00t! A new event has been added to intouch! 🍾🎉
Event Name: ${event.name}
Event Date: ${moment(event.date).format('MMMM Do, YYYY')}
Venue: ${event.venue}
Location: ${event.city}, ${event.state}
Status: ${event.status}
      `

      forEach(sendText(message), withNumbers)


    })
    .catch(err => console.log('err!', err))
}