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
        'client_id': 'AQ6TShBsSnnVQ-uydRXkPOUie7WgesLBuivKjAC__dbRSzPuiFuGMtocMVa-',
        'client_secret': 'ELWpIhCxsSm2N-Amz5k7M61LC_acKv_JizZTIUm1-hBnhvqJOK-_rlSzXC_z'
    };

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http:\/\/localhost:3000\/payments\/" + req.body.id + "\/success\/true",
            "cancel_url": "http:\/\/localhost:3000\/payments\/" + req.body.id + "\/success\/false"

            //"return_url": "http:\/\/ShirtThropy.kadosh.co\/payments\/" + req.body.id + "\/success\/true",
            //"cancel_url": "http:\/\/ShirtThropy.kadosh.co\/payments\/" + req.body.id + "\/success\/false"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": req.body.amount
            },
            "description": "This is the payment description."
        }]
    };


    paypal_api.payment.create(create_payment_json,
        config_opts,
        function (err, payment) {
            if (err) {
                throw err;
            }

            if (payment) {
                console.log("Create Payment Response");
                console.log(payment);

                var redirectUrl;
                for(var i=0; i < payment.links.length; i++) {
                    var link = payment.links[i];
                    if (link.method === 'REDIRECT') {
                        redirectUrl = link.href;
                    }
                }
                res.redirect(redirectUrl);
            }
    });

    //res.render('profile/' + req.params.id, { id: req.params.id });
};