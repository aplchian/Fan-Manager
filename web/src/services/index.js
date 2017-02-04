const axios = require('axios')
const url = process.env.REACT_APP_XHR


const syncFans = (cb) => {
  return axios.put(`${url}syncFans`)
}


module.exports = {
  syncFans
}
