var createError = require('http-errors');
var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParse = require('body-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();
app.use(express.json({ limit: '10mb' }));

app.use(bodyParse.json({
  inflate: true,
  limit: '10mb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined,
}));
app.use(bodyParse.urlencoded({ limit: '10mb', extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//--------------------------------------------------
app.use(cookieSession({
  name: 'session',
  keys: ['HelloWorldFarmviell98sdf21654'],
  resave: false,
  saveUninitialized: false,
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// ROTAS
//--------------------------------------------------
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
//--------------------------------------------------
app.use((req, res, next) => {
  let logado = (req.session.user != undefined);
  res.status(404).render('nao-encontrado',{logado, rotulo:'404 Não encontrado'});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
