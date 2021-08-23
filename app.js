var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var app = express();

// Connect the mongodb database
const uri = "mongodb+srv://mitnick:gHyoPJeTtmdk1zay@sandbox.u7ruw.mongodb.net/Library?retryWrites=true&w=majority";
// Mongoose connecting to the mongoDB database
mongoose.connect(uri, {  
  useNewUrlParser: true,  
  useUnifiedTopology: true}).then(() => { console.log('MongoDB Connected')}).catch(err => console.log(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');

// view engine setup
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080);
module.exports = app;
