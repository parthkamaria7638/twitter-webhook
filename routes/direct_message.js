    const request = require('request-promise');
    const auth = require('../helpers/auth.js');
    const body_parser = require('body-parser');
    const hmacsha1 = require('hmacsha1');

    var randomString = function(length) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for(var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    var calculateOauthSignature = (params) => {
      var sigBaseStr = "";
      var tempSigBaseStr = "";
      var url = 'https://api.twitter.com/1.1/direct_messages/events/new.json';
      tempSigBaseStr += encodeURIComponent("include_entities") + "+" + encodeURIComponent("true") + "&" +
      encodeURIComponent("oauth_consumer_key") + "=" + encodeURIComponent(params.oauth_consumer_key) + "&" +
      encodeURIComponent("oauth_nonce=") + "=" + encodeURIComponent(params.oauth_nonce) + "&" +
      encodeURIComponent("oauth_signature_method") + "=" + encodeURIComponent("HMAC-SHA1") + "&" +
      encodeURIComponent("oauth_timestamp") + "=" + encodeURIComponent(params.oauth_timestamp) + "&" +
      encodeURIComponent("oauth_token") + "=" + encodeURIComponent(params.oauth_token) + "&" +
      encodeURIComponent("oauth_version") + "=" + encodeURIComponent("1.0");
      sigBaseStr += 
        'POST&' + 
        encodeURIComponent(url) + '&' +
        encodeURIComponent(tempSigBaseStr);
      var signingKey = 
        encodeURIComponent(params.consumer_secret) + '&' +
        encodeURIComponent(params.token_secret);
      var signature = hmacsha1(signingKey, sigBaseStr);
      console.log(signature);
      // return  Buffer.from(signature).toString('base64');
      return signature;
    }

    module.exports = function (req, response) {
      var json_response;
        console.log("Reached Here ###################");
        var genRandomString = randomString(42);
        var timeStamp = Math.round(new Date().getTime()/1000);
        var params = {
          oauth_consumer_key: auth.twitter_oauth.consumer_key,
          oauth_nonce: genRandomString,
          oauth_signature_method:"HMAC-SHA1",
          oauth_timestamp: timeStamp,
          oauth_token:  auth.twitter_oauth.token,
          oauth_version:"1.0",
          consumer_secret: auth.twitter_oauth.consumer_secret,
          token_secret: auth.twitter_oauth.token_secret
        };
        var headerString = '';
        var _oauth_signature = calculateOauthSignature(params);
        console.log("TimeStamp: " + timeStamp);
        console.log("nonce: " + genRandomString);
        console.log(encodeURIComponent(_oauth_signature));
        headerString = 
          "OAuth " + 
          encodeURIComponent("oauth_consumer_key") + "=" + '"' + encodeURIComponent(auth.twitter_oauth.consumer_key) + '"' + ", " +
          encodeURIComponent("oauth_nonce") + "=" + '"' + encodeURIComponent(genRandomString) + '"' + ", " +
          encodeURIComponent("oauth_signature") + "=" + '"' + encodeURIComponent(_oauth_signature) + '"' + ", " +
          encodeURIComponent("oauth_signature_method") + "=" + '"' + encodeURIComponent("HMAC-SHA1") + '"' + ", " +
          encodeURIComponent("oauth_timestamp") + "=" + '"' + encodeURIComponent(timeStamp) + '"' + ", " +
          encodeURIComponent("oauth_token") + "=" + '"' + encodeURIComponent(auth.twitter_oauth.token) + '"' + ", " +
          encodeURIComponent("oauth_version") + "=" + '"' + encodeURIComponent("1.0") + '"';
          console.log("ID = " + req.body.id);
          console.log("Message = " + req.body.message);
        var body = {
          event: {
            "type": "message_create",
            "message_create": {
                "target": {
                    "recipient_id": req.body.id
                },
                "message_data": {
                    "text": req.body.message,
                }
            }
          }
        };
        console.log("-------");
        console.log(headerString);
        console.log("--------");
        console.log(JSON.stringify(body));
        var headers = {
          authorization: headerString,
          //"content-type": "application/json"
        };
        var request_options = {
          url: "https://api.twitter.com/1.1/direct_messages/events/new.json",
          header: JSON.stringify(headers),
          data: JSON.stringify(body)
        }
        request.post(request_options)
      .then(function (body) {
          console.log("Success");
          //console.log(body);
          response.send(body);
      })
      .catch(function (body) {
        console.log("Failure");
        //console.log(body);
        response.send(body);
      });

    }