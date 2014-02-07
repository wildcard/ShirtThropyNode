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

exports.profile = function (req, res) {
    getUser(req.params.id,
        function (user) {
            if (!user)
                user = { pic: "", data: {  } };

            res.render('profile', { user: user});
        })
};

