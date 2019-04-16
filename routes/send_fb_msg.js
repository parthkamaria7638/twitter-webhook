const request = require('request');


module.exports = function(req, res) {
    sender = req.body.id;
    text = req.body.msg;
    request({
        url: 'https://graph.facebook.com/v3.2/me/messages',
        qs: {access_token: 'EAAfTifl8Qi0BAEEvlp83rIkARRgTE3uwvKAPcjkunWzO2pBZAJH7AFfeEkMufGQEYyZBOSWNohs7MCrqTCJ5h4FZBl8LzBY49CCXk2Iq2BqbA87vnbgdUKBBuz8ojAGGkZC41tPDnEha6amNhBPvMudDsKCZAThfJoWztS8AWnwZDZD'},
        method: 'POST',
        json: {
          recipient: {id: sender},
          message: {text: text}
        }
      }, function (error, response) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
      });
}
