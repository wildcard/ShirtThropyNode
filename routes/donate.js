/**
 * Created by kok on 6/2/14.
 */


exports.list = function(req, res){
    var foo = { name: 'foobar', id: req.param("id") };
    res.render('donate', foo);
};