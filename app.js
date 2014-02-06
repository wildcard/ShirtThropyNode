
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var donate = require('./routes/donate');
var http = require('http');
var path = require('path');

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
app.get('/public/*', function(req, res){
    res.sendfile(req.params[0], {root: './public'});
});
app.get('/users', user.list);
app.get('/doante/:id', donate.donate);



app.get('/profile/', function(req, res){
    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.end(body);
});

http.createServer(app).listen(
    app.get('port'),
    function(){
    console.log('Express server listening on port ' + app.get('port'));
    }
);
