var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');//session中间件, req.session, 依赖cookieParser
var MongoStore = require('connect-mongo')(session);
var config = require('./config');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');
var categories = require('./routes/categories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());//处理content-type=json的请求体{"name":"lx"}
app.use(bodyParser.urlencoded({ extended: false }));//处理content-type=urlencoded的请求体 | extended为true表示使用querystring来将请求体的字符串转成对象
app.use(cookieParser());
app.use(session({
  secret: '27ng',//加密的字符串
  resave: true, //是否每次响应后重新保存session数据
  saveUninitialized: true,//保存新创建但未初始化的session
  store: new MongoStore({
    url: config.dbUrl
  })
}));
app.use(flash());
app.use(function(req, res, next){
  //res.locals是模版渲染的对象, ejs里的对象传的的是
  //app.render = function(name, options, callback){}
  //merge(renderOptions, this.locals);
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);
app.use('/categories', categories);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user 不向用户暴露堆栈信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}//隐藏错误对象
  });
});


module.exports = app;
