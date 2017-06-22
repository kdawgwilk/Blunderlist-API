const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')
const passport   = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy

const items      = require('./routes/items')
const groups     = require('./routes/groups')
const users      = require('./routes/users')

const User       = require('./models/user')

passport.use(new BasicStrategy(function (username, password, callback) {
  User.findOne({ username: username }, function (err, user) {
    if (err) { 
      return callback(err)
    }
    if (!user) { 
      return callback(null, false)
    }
    if (user.password != password) { 
      return callback(null, false)
    }
    return callback(null, user)
  })
}))

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

app.use(passport.initialize())
app.use(users)
app.all('*', passport.authenticate('basic', { session: false }))
app.use(items)
app.use(groups)


app.listen(3000, function () {
  console.log('Blunderlist API listening on port 3000!')
})