
/**
 * Module dependencies.
 */
// static data libery

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var donate = require('./routes/donate');

var http = require('http');
var path = require('path');

var newCause = require('./routes/newCause');
var myDonations = require('./routes/myDonations');
var helpUs = require('./routes/helpUs');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// register router routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/newCause', newCause.list);
app.get('/myDonations', myDonations.list);
app.get('/helpUs', helpUs.list);
app.get('/doante/:id', donate.donate);

app.get('/public/*', function(req, res){
    res.sendfile(req.params[0], {root: './public'});
});

app.get('/bower_components/*', function(req, res){
    res.sendfile(req.params[0], {root: './bower_components'});
});

app.get('/users', user.list);
app.get('/donate/:id', donate.donate);

// return from paypal
app.get('/payments/:id/success/:status', donate.donatePayPalApprove);

// call to paypal
app.post('/pay', donate.donatePayPal);

app.get('/profile/:id', function(req, res){
    // TODO: seeker profile
});

// database
var dirty = require('dirty');
var db = dirty('user.db');

var appDb = dirty('app.db'),
    sectionsDb;

db.on('load', function() {
    db.set('john', {eyes: 'blue'});
    console.log('Added john, he has %s eyes.', db.get('john').eyes);

    db.set('bob', {eyes: 'brown'}, function() {
        console.log('User bob is now saved on disk.')
    });

    db.forEach(function(key, val) {
        console.log('Found key: %s, val: %j', key, val);
    });
});

db.on('drain', function() {
    console.log('All records are saved on disk now.');
});

//



http.createServer(app).listen(
    app.get('port'),
    function(){
    console.log('Express server listening on port ' + app.get('port'));
    }
);
