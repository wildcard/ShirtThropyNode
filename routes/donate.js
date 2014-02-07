/**
 * Created by kok on 6/2/14.
 */



exports.donate = function(req, res){
    // TODO: call contoller to



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

    req.session.user = u2;

    var cause = {
        id: req.params.id,
        image: '/public/img/NitzaneyRishon_Logo.jpg',
        user : req.session.user,
        // profile_avatar: '/public/img/profile-avatar.jpg',
        // profile_firstName: 'Kobi',
        // profile_lastName: 'Kadosh',
        cause_title: 'Nitzaney Rishon Charity',
        description: 'For more than 100 years, Big Brothers Big Sisters has operated under the belief that inherent in every child is the ability to succeed and thrive in life. As the nation’s largest donor and volunteer supported mentoring network, Big Brothers Big Sisters makes meaningful, monitored matches between adult volunteers (“Bigs”) and children (“Littles”), ages 6 through 18, in communities across the country. We develop positive relationships that have a direct and lasting effect on the lives of young people.',
        donation_current: 39.34,
        donation_target: 80.01
    }
    res.render('donate', cause);
};

exports.donatePayPalApprove = function(req, res){
    // return from paypal

    req.session.last_cause_id = req.params.id;



    if(req.params.status){
        res.render('thankyou', { user: req.session.user });
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
                "total": req.body.amount,
                //"details": {
                //    "subtotal": req.body.amount * 0.9,
                //    "tax": req.body.amount * 0.1
                //}
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