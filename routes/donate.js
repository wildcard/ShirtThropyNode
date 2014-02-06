/**
 * Created by kok on 6/2/14.
 */



exports.donate = function(req, res){
    // TODO: call contoller to
    var cause = {
        id: req.params.id,
        image: '/public/img/Homelessman.jpg',
        profile_avatar: '/public/img/profile-avatar.jpg',
        profile_firstName: 'Kobi',
        profile_lastName: 'Kadosh',
        cause_title: 'Charles Homelessman',
        description: 'Was a British politician who was the Prime Minister of the United Kingdom from 1940 to 1945 and again from 1951 to 1955. Widely regarded as one of the greatest wartime leaders of the 20th century, Churchill was also an officer in the British Army, a historian, a writer, and an artist. He is the only British Prime Minister to have won the Nobel Prize in Literature, and was the first person to be made an honorary citizen of the United States.',
        donation_current: 39.34,
        donation_target: 80.01
    }
    res.render('donate', cause);
};

exports.donatePayPalApprove = function(req, res){
    // return from paypal

    // req.params.status;
    // req.params.id;
    if(req.params.status){
        res.render('thankyou', {  });
    }
    else{
        // TODO: redierct to not successful
    }
};

exports.donatePayPal = function(req, res){
    // TODO: call to paypal api
    // req.form.amount
    // req.form.id

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
            "return_url": "http:\/\/ShirtThropy.kadosh.co\/payments\/" + req.form.id + "\/success\/true",
            "cancel_url": "http:\/\/ShirtThropy.kadosh.co\/payments\/" + req.form.id + "\/success\/false"
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

    //res.render('profile/' + req.params.id, { id: req.params.id });
};