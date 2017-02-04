const express = require('express')
const app = express()
const dal = require('../DAL/no-sql.js')
const cors = require('cors')
var bodyParser = require('body-parser')
const axios = require('axios')
const jwt = require('express-jwt')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

//checks all urls for auth token
// app.use(checkJwt)
// app.use('/api',checkJwt)
// app.use('/health',checkJwt) <--pingdom

const checkJwt = jwt({
  secret: process.env.AUTH0_SECRET
})

app.get('/protected', checkJwt, function(req,res){
  res.send({message: 'you are authorized!'})
})



app.get('/fans/state/:bandId',function(req,res){
  let options = {
    sortToken: req.query.sorttoken,
    bandId: req.params.bandId,
    limit: req.query.limit,
    state: req.query.state
  }
  dal.fansByState(options,function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(res){
      res.send(body)
    }
  })
})

app.get('/fans/:fan',function(req,res){
  const fan = req.params.fan
  console.log('fan',fan);
  dal.getFan(fan)
    .then(body => {
      res.send(body)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/fans',function(req,res){

  let view = req.query.streetteam === "true"
              ? "artiststreetteam"
              : "artistfans"

  let options = {
    include_docs: true,
    keys: [req.query.artist]
  }
  dal.getView(view,options,function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(body){
      res.send(body)
    }
  })
})

app.post('/fans',function(req,res){
  var doc = req.body
  dal.createFan(doc,function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(body){
      return res.send(body)
    }
  })
})

app.put('/fans',function(req,res){
  var doc = req.body
  dal.updateFan(doc)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.delete('/fans/:id',function(req,res){
  dal.removeFan(req.params.id)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.get('/bands/:id',function(req,res){
  dal.getBand(req.params.id)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.post('/mailchimp',function(req,res){
  var doc = req.body
  axios({
    method: 'post',
    data: {
          "operations": doc
    },
    url: "https://us3.api.mailchimp.com/3.0/batches",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `apikey ${process.env.MAILCHIMP}`
    }
  })
  .then(results => res.send({ok: true}))
  .catch(err => console.log(err))
})

app.post('/events',function(req,res){
  var doc = req.body
  dal.createEvent(doc,function(err,body){
    if(err){
      res.status(400)
      return res.send({ok: false, err: err.message})
    }
    return res.send({ok: true})
  })
})

app.post('/daysheets',function(req,res){
  var doc = req.body
  dal.createDaySheet(doc,function(err,body){
    if(err){
      res.status(400)
      return res.send({ok: false, err: err.message})
    }
    return res.send({ok: true})
  })
})

app.get('/events/:id',function(req,res){
  let event = req.params.id
  dal.getEvent(event)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.get('/daysheets/:id',function(req,res){
  let id = req.params.id
  dal.getDaySheet(id)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.get('/events',function(req,res){
  let options = {
    include_docs: true
  }
  dal.getView('events',options,function(err,body){
    if(err) return console.log(err.message)
      return res.send(body)
  })
})

app.get('/daysheets',function(req,res){
  let options = {
    include_docs: true
  }
  dal.getView('daysheets',options,function(err,body){
    if(err) return console.log(err.message)
      return res.send(body)
  })
})

app.put('/events',function(req,res){
  var doc = req.body
  dal.updateEvent(doc)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.put('/daysheets',function(req,res){
  var doc = req.body
  dal.updateDaySheet(doc)
  .then(resp => res.send(resp))
  .catch(err => {
    res.status(400)
    res.send(err.message)
  })
})

app.put('/todos',function(req,res){
  var doc = req.body
  dal.updateTodo(doc)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.delete('/events/:id',function(req,res){
  dal.removeEvent(req.params.id)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.delete('/daysheets/:id',function(req,res){
  dal.removeDaySheet(req.params.id)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.delete('/todos/:id',function(req,res){
  dal.removeTodo(req.params.id)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.get('/events/artists/:artistid',function(req,res){
  let data = {
    startDate: req.query.startdate,
    endDate: req.query.enddate,
    artistID: req.params.artistid
  }
  dal.getArtistEvents(data,function(err,body){
    if(err) return console.log(err.message)
      return res.send(body)
  })
})

app.get('/daysheets/artists/:artistid',function(req,res){
  let data = {
    startDate: req.query.startdate,
    endDate: req.query.enddate,
    artistID: req.params.artistid
  }
  dal.getArtistDaySheets(data,function(err,body){
    if(err) return console.log(err.message)
      return res.send(body)
  })
})

app.get('/todos/artists/:artistid',function(req,res){
  let data = {
    startDate: req.query.startdate,
    endDate: req.query.enddate,
    artistID: req.params.artistid
  }
  console.log('data',data)
  dal.getArtistTodos(data,function(err,body){
    if(err) return console.log(err.message)
      return res.send(body)
  })
})

app.post('/todos',function(req,res){
  var doc = req.body
  dal.createTodo(doc,function(err,body){
    if(err){
      res.status(400)
      return res.send({ok: false, err: err.message})
    }
    return res.send({ok: true})
  })
})

app.get('/todos/:id',function(req,res){
  let id = req.params.id
  dal.getTodo(id)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.get('/users/:id',function(req,res){
  dal.getUser(req.params.id)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})

app.post('/users',function(req,res){
  var doc = req.body
  console.log('new user',doc)
  dal.createUser(doc,function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(body){
      return res.send(body)
    }
  })
})

app.get('/bands',function(req,res){
  let userId = req.query.userId
  dal.getUserBands(userId,function(err,body){
    if(err) return console.log(err.message)
      return res.send(body)
  })
})


app.listen(3046,function(){
  console.log('listening on port 3039')
})
