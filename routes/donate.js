/**
 * Created by kok on 6/2/14.
 */



exports.donate = function(req, res){
    // TODO: call contoller to
    res.render('donate', { id: req.params.id });
};

exports.donatePayPal = function(req, res){
    // TODO: call to paypal api
    //req.form.amount


    var paypal_api = require('paypal-rest-sdk');

    var config_opts = {
        'host': 'api.sandbox.paypal.com',
        'port': '',
        'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
        'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
    };

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http:\/\/ShirtThropy.kadosh.co\/payments\/success\/true",
            "cancel_url": "http:\/\/localhost\/test\/rest\/rest-api-sdk-php\/sample\/payments\/ExecutePayment.php?success=false"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": req.form.amount
            },
            "description": "This is the payment description."
        }]
    };


    paypal_api.payment.create(create_payment_json, config_opts, function (err, res) {
        if (err) {
            throw err;
        }

        if (res) {
            console.log("Create Payment Response");
            console.log(res);
        }
    });

    res.render('profile', { id: req.params.id });
};