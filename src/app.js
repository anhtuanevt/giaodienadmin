var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config();
const expressLayouts = require("express-ejs-layouts");
const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const db = require('./configs/db');
var indexRouter = require('./routes/index');

var app = express();
db.connect();

// db.dropIndex('articles', 'slug_1_tags_1_category_id_1_name_text_title_text_description_text');
db.createIndex('articles', { slug: 1});
db.createIndex('articles', { tags: 1});
db.createIndex('articles', { category_id: 1});
db.createIndex('articles', { is_hot: 1});
db.createIndex('articles', { is_home : 1});
db.createIndex('articles', { createdAt: -1 });
db.createIndex('articles',{ name: "text", title: "text", description: "text" })

app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key', // Add a secret key for session encoding
    resave: false,             // Don't save session if unmodified
    saveUninitialized: false,  // Don't create session until something stored
    cookie: { maxAge: 60000 }
}));
app.use(flash(app));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set("layout", "index");

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => {
  const error = new Error("Not found ");
  error.status = 404;
  next(error);
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

module.exports = app;