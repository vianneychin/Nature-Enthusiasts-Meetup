require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const logger = require('morgan')
const userRouter = require('./routes/users')
const eventRouter = require('./routes/events')
const authRouter = require('./routes/auth')
const session = require('express-session')

require('./db/db')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
// Express can take in json data
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
  session({
    secret: 'Random string',
    resave: false,
    saveUninitialized: false
  })
)

app.use(logger('dev'))
// adding static style
app.use(express.static('public'))
app.use('/user', userRouter)
app.use('/events', eventRouter)
app.use('/auth', authRouter)

// Rendering the home.ejs landing page
app.get('/', (req, res) => {
  res.render('home/home.ejs')
})

app.listen(PORT, err => {
  console.log(err || 'App is listening on port', PORT)
})
