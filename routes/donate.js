/**
 * Created by kok on 6/2/14.
 */



exports.donate = function(req, res){
    // TODO: call contoller to
    res.render('donate', { id: req.params.id });
};

exports.donatePayPal = function(req, res){
    // TODO: call to paypal api
    // req.form.name

    res.render('profile', { id: req.params.id });
};