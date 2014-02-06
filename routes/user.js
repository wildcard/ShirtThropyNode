
/*
 * GET users listing.
 */

exports.profile = function(req, res){
    //res.send("respond with a resource");
    res.render('profile',
        {
            id: req.param.id
        });
};