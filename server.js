/* eslint-env node */
require('dotenv').config() // allows us to use .env variables in local mode
var express = require('express')
var app = express()
var port = process.env.PORT
var morgan = require('morgan')

// Set up express application
app.use(express.static('public')) // serve static resources in /public
app.use(morgan('dev')) // morgan will log every request to console

// Import routes
// See https://expressjs.com/en/guide/routing.html for details on this pattern
var api = require('./app/routers/api.js') // get the router
app.use('/api', api) // mount the router to the http path '/api'

// Launch app
app.listen(port)
console.log('App is listening on port ' + port)
