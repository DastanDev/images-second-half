var dotenv = require('dotenv')
dotenv.config()
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var handlebars = require('express-handlebars')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var imagesRouter = require('./routes/images')
var db = require('./helpers/db/connectDb')
var colors = require('colors')

var app = express()
db.connect(err => {
  if (err) {
    console.log(colors.red(`Error connecting to MySQL database...`))
    return
  }
  console.log(colors.blue(`Database Connnected...`))
})

app.engine(
  'hbs',
  handlebars({
    layoutsDir: path.join(__dirname, 'views/layouts'), //where to look for layouts
    partialsDir: path.join(__dirname, 'views/partials'), // where to look for partials
    extname: '.hbs', //expected file extension for handlebars files
    defaultLayout: 'layout', //default layout for app, general template for all pages in app
    helpers: {} //adding new helpers to handlebars for extra functionality
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter) // route middleware from ./routes/index.js
app.use('/users', usersRouter) // route middleware from ./routes/users.js
app.use('/images', imagesRouter)

/**
 * Catch all route, if we get to here then the
 * resource requested could not be found.
 */
app.use((req, res, next) => {
  next(createError(404, `The route ${req.url} does not exist.`))
})

/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = err
  console.log(err)
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
