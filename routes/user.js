/*
 * GET users listing.
 */

// user
//{
//    fname: "Kobi",
//    lname: "Kadosh",
//    avatar: '/public/img/profile-avatar.jpg',
//    causes: [1],
//    data: {
//      rank: 1-5,
//      total_donations: "",
// }
//}

var getUser = function (id, callback) {
    // get user from db
    var dirty = require('dirty');
    var db = dirty('user.db');

    db.on('load', function () {
        callback(db.get(id));
    });

    return -1;
};

exports.list = function (req, res) {
    // get all users from db
    var dirty = require('dirty');
    var db = dirty('user.db');

    var users = [];

    db.on('load', function () {
        db.forEach(function (key, val) {
            users.push(
                {
                    id: key,
                    name: val.name,
                    avatar: val.avatar,
                    rank: val.data.rank
                });
        });
    });

    res.render('users', users);
};

exports.login = function (req, res) {

    var user = req.session.user;

    if(user)
       res.redirect('profile/' + user.id);

    var passport = require('passport')
        , FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new FacebookStrategy({
            clientID: "289494961199568",
            clientSecret: "9cc4960a1f635f92f9803cb26e1239b3",
            //callbackURL: "http://localhost:3000/auth/facebook/callback"
            callbackURL: "http://ShirtThropy.kadosh.co/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {

            console.log(profile);

            done(null, user);
        }
    ));

    // TODO: facebook
    var user = { id: "" };
    req.session.user = user // from facebook

    var dirty = require('dirty');
    var db = dirty('user.db');
    db.set(user.id, user);

    res.redirect('profile/' + req.params.id);
};

exports.profile = function (req, res) {
    getUser(req.params.id,
        function (user) {
            if (!user)
                user = { pic: "", data: {  } };

            res.render('profile', { user: user});
        })
};

