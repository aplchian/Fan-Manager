const express = require('express')
const app = express()
const dal = require('../DAL/no-sql.js')
const cors = require('cors')
var bodyParser = require('body-parser')
const axios = require('axios')

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });
app.use(cors())
app.use(bodyParser.json())


app.get('/fans/state/:state',function(req,res){
  dal.fansByState(req.params.state,1000,function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(res){
      res.send(body)
    }
  })
})

app.get('/fans/:fan',function(req,res){
  var fan = req.params.fan
  dal.getFan(fan,function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(body){
      res.send(body)
    }
  })
})

app.get('/fans',function(req,res){
  dal.getAllFans('allfans',function(err,body){
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
  dal.updateFan(doc,function(err,body){
    if(err){
      return(console.log(err.message))
    }
    if(body){
      return res.send(body)
    }
  })
})

app.get('/streetteam',function(req,res){
  dal.listStreetTeam('streetteam',function(err,body){
    if(err){
      return console.log(err.message)
    }
    if(body){
      res.send(body)
    }
  })
})

app.delete('/fan/:id',function(req,res){
  dal.removeFan(req.params.id,function(err,body){
    if(err){
      return res.send(err.message)
    }
    if(body){
      res.send(body)
    }
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
        "Authorization": "apikey f517cf56d577b4ac23c81929c36353fc-us3"
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

app.get('/events/:id',function(req,res){
  let event = req.params.id
  dal.getEvent(event)
    .then(resp => res.send(resp))
    .catch(err => {
      res.status(400)
      res.send(err.message)
    })
})



app.listen(3039,function(){
  console.log('listening on port 3039')
})
