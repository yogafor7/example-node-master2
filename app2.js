var express = require('express');
var app = express();
var path = require('path');
var mongoose = require("mongoose");

var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

global.dbHelper = require( './common/dbHelper' );

global.db = mongoose.connect("mongodb://127.0.0.1:27017/test1");

app.use(session({
    resave: 'ture',
    saveUninitialized: 'true',
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));

// 霈曉?views??嚗?銝箄??曉??曄??桀?
app.set('views', path.join(__dirname, 'views'));


// 霈曉?view engine??嚗?銝箇?憿菜芋?踹???//app.set('view engine', 'ejs');
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// 霈曉???隞嗥敶?瘥??砍?辣
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});


require('./routes')(app);

app.get('/', function(req, res) {
    res.render('login');
});

app.listen(3000);