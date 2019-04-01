var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
var Task = require('./api/models/todoListModel') // created model loading here
require('./api/models/gatherEntryModel')
var bodyParser = require('body-parser')

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://server:server1@ds157735.mlab.com:57735/acro_db', { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var routes = require('./api/routes/todoListRoutes') // importing route
routes(app) // register the route

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(port)

console.log('todo list RESTful API server started on: ' + port)