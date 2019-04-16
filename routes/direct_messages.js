var Twit = require('twit');
const auth = require('../helpers/auth.js');

var T = new Twit({
    consumer_key: auth.twitter_oauth.consumer_key,  
    consumer_secret: auth.twitter_oauth.consumer_secret,
    access_token: auth.twitter_oauth.token,
    access_token_secret:  auth.twitter_oauth.token_secret, // optional HTTP request timeout to apply to all requests.
});

module.exports = function(req, res) {
    var event = {
        "type": "message_create",
        "message_create": {
            "target": {
                "recipient_id": req.body.id
            },
            "message_data": {
                "text": req.body.message
            }
        }
    };
    T.post('direct_messages/events/new', {event:event})
        .then((result) => {
            console.log(result);
            res.send({ success: true, data: result });
        })
        .catch((err) => {
            res.send({ success: false, data: err });
        });
}
