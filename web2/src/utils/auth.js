const Auth0Lock = require('auth0-lock').default
const jwtDecode = require('jwt-decode')
const moment = require('moment')
const axios = require('axios')
const url = process.env.REACT_APP_XHR


module.exports = function(clientId,domain) {
  const lock = new Auth0Lock(clientId, domain)



  lock.on('authenticated', _doAuthentication)

  function login() {
    lock.show()
  }

  let notifyFunc

  function _doAuthentication(authResult){
    setToken(authResult.idToken)
    lock.getUserInfo(authResult.accessToken, function(err,profile){
      if (err) return console.log(err.message)
      localStorage.setItem('profile',JSON.stringify(profile))
      console.log('PROFILE',profile,`${url}/users`)
      axios.post(`${url}users`,profile)
        .then(res => console.log('success',profile))
        .catch(err => console.log('err',err.message))
      if(notifyFunc) { notifyFunc(profile) }
    })

  }

  function logout(){
    localStorage.removeItem('id_token')
  }

  function setToken(idToken){
    localStorage.setItem('id_token', idToken)
  }

  function getToken(){
    return localStorage.getItem('id_token')
  }

  function loggedIn(){
    return getToken() ? true : false
  }

  function subscribe(fn){
    notify.push(fn)
  }

  function notify(fn){
    notifyFunc = fn
  }

  if(getToken()){
    const info = jwtDecode(getToken())
    // console.log('current',moment().toString())
    // console.log('expires', moment.unix(info.exp)))
    if(moment().isAfter(moment.unix(info.exp))){
      logout()
    }
  }

  return {
    login,
    logout,
    loggedIn,
    setToken,
    getToken,
    subscribe,
    notify
  }
}
