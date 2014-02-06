
/*
 * GET users listing.
 */

exports.list = function(req, res){
    var foo = {name: 'foobar'};
    res.render('users', foo);
};