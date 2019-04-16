var Twit = require('twit');
const auth = require('../helpers/auth.js');

var T = new Twit({
    consumer_key: auth.twitter_oauth.consumer_key,  
    consumer_secret: auth.twitter_oauth.consumer_secret,
    access_token: auth.twitter_oauth.token,
    access_token_secret:  auth.twitter_oauth.token_secret, // optional HTTP request timeout to apply to all requests.
});

module.exports = function(req, res) {
    var data = {
        "status": req.body.msg,
        "in_reply_to_status_id": req.body.id
    }
    T.post('statuses/update', {"status": "@" + req.body.name + req.body.msg + "\n#" + new Date().getTime(),
    "in_reply_to_status_id": req.body.id})
        .then((result) => {
            console.log(result);
            res.send({ success: true, data: result });
        })
        .catch((err) => {
            res.send({ success: false, data: err });
        });
}
