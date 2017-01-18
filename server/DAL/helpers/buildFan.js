const {pathOr} = require('ramda')

module.exports = fan => {
  var todayDate = new Date()
  var {state,email} = fan
  return {
    "email": email,
    "f_name": pathOr('N/A',['f_name'],fan),
    "l_name": pathOr('N/A',['l_name'],fan),
    "state": pathOr('N/A',['state'],fan),
    "city": pathOr('N/A',['city'],fan),
    "join": todayDate.toISOString(),
    "streetteam": pathOr(false,['streetteam'],fan),
    "band": pathOr('N/A',['band'],fan),
    "type": "fan",
    "_id" : `fan_${state}_${email}`
  }
}
