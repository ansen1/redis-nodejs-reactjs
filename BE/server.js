let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let methodOverride = require('method-override')
let redis = require('redis')
let client = redis.createClient({
  host: 'redis-13224.c1.asia-northeast1-1.gce.cloud.redislabs.com',
  port: 13224,
  password: 'xazDPllQd1asE639gLb1s0jqoS7HZ2kW'
})
let cors = require('cors')

// define routes
let routes = require('./Routes/api')

// Set Port
let PORT = 8080

// Init app
let app = express()
app.use(cors())

// instantiate a connection to redis 
console.log(client.address);
client.on('connect', () => {
  console.log('Connected to Redis...')
})

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// methodOverride
app.use(methodOverride('_method'))

// Routes Middleware
app.use(routes)

// 404 handler
app.use((req, res) => {
  res.status(404)
  res.send('endpoint not found')
})

// serve application on specified port
app.listen(PORT, () => {
  console.log('Server started on port ' + PORT)
});

module.exports = app
