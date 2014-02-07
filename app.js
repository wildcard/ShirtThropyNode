/**
 * Module dependencies.
 */
// static data libery

var express = require('express');
//var passport = require('passport');
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
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret: '1234567890QWERTY'}));
//app.use(express.session({ secret: 'keyboard cat' }));
//app.use(passport.initialize());
//app.use(passport.session());
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

app.get('/public/*', function (req, res) {
    res.sendfile(req.params[0], {root: './public'});
});

app.get('/bower_components/*', function (req, res) {
    res.sendfile(req.params[0], {root: './bower_components'});
});

//app.get('/users', user.list);
app.get('/donate/:id', donate.donate);

// return from paypal
app.get('/payments/:id/success/:status', donate.donatePayPalApprove);

// call to paypal
app.post('/pay', donate.donatePayPal);

app.get('/profile/:id', user.profile);


/*
var passport = require('passport')
    , util = require('util')
    , FacebookStrategy = require('passport-facebook').Strategy;
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
*/

/*
app.get('/login', function (req, res) {

    var user = req.session.user;

    if(user)
        res.redirect('profile/' + user.id);

    passport.use({usernameField: 'emailAddress'}, new FacebookStrategy({
            clientID: "289494961199568",
            clientSecret: "9cc4960a1f635f92f9803cb26e1239b3",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
            //callbackURL: "http://ShirtThropy.kadosh.co/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {

            console.log(profile);

            return done(null, profile);
        }
    ));

    var dirty = require('dirty');
    var db = dirty('user.db');
    db.set(user.id, user);

    res.redirect('profile/' + req.params.id);
});

app.get('/auth/facebook', passport.authenticate('facebook', { display: 'touch' }));

// TODO: user id
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/profile/1', failureRedirect: '/login' })
);
*/

// database
var dirty = require('dirty');
var db = dirty('user.db');

var appDb = dirty('app.db'),
    causesDb;

db.on('load', function () {
    var u1 = {
        id: 1,
        fname: "Kobi",
        lname: "Kadosh",
        avatar: '/public/img/profile-avatar.jpg',
        causes: [1],
        data: {
            rank: 3,
            total_donations: "1500"
        }
    }

    db.set('1', u1);

    var u2 = {
        id: 2,
        fname: "lior",
        lname: "Kadosh",
        avatar: '/public/img/profile-avatar.jpg',
        causes: [1],
        data: {
            rank: 5,
            total_donations: "2530"
        }
    }

    db.set('2', u2);

    db.forEach(function (key, val) {
        console.log('Found key: %s, val: %j', key, val);
    });
});

db.on('drain', function () {
    console.log('All records are saved on disk now.');
});

//


http.createServer(app).listen(
    app.get('port'),
    function () {
        console.log('Express server listening on port ' + app.get('port'));
    }
);
