var express = require('express');
var app = express();
var path = require('path');
var mongoose = require("mongoose");
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
var mongodbUri = 'mongodb://yogafor7:a3615136@ds139278.mlab.com:39278/heroku_8czrql6hb';

var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

global.dbHelper = require( './common/dbHelper' );

global.db = mongoose.connect(mongodbUri, options);

app.use(session({
    resave: 'ture',
    saveUninitialized: 'true',
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));

app.set('views', path.join(__dirname, 'views'));


app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


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
