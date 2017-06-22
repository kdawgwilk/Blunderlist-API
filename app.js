const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')

const items      = require('./routes/items')
const groups     = require('./routes/groups')


// connect to your local DB
// mongod
mongoose.connect('mongodb://localhost/Blunderlist')
// Connect to Kaden's DB
// mongoose.connect('mongodb://144.38.175.196/YourName')
// connect to DJ's DB
// mongoose.connect('mongodb://mongodb.cs.dixie.edu/YourName')


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const myLogger = function (req, res, next) {
  const isUserAuthenticated = true
  // console.log('LOGGED')
  if (isUserAuthenticated) {
    next()
  } else {
    res.status(401)
    res.json("Unauthorized")
  }
}

app.use(myLogger)


app.post('/', function (req, res) {
    res.json(req.body.name)
})

// http://localhost:3000/Kaden
// app.get('/:id', function (req, res) {
//     res.json('Hello, ' + req.params['id'])
// })

app.use('/', items)
app.use('/', groups)

app.listen(3000, function () {
  console.log('Blunderlist API listening on port 3000!')
})