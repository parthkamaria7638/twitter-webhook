const request = require('request-promise')
const auth = require('../helpers/auth')
const socket = require('../helpers/socket')


var activity = function (req, resp) {
  var json_response = {
    socket_host: req.headers.host.indexOf('localhost') == 0 ? 'http://' + req.headers.host : 'https://' + req.headers.host,
    activity_event: socket.activity_event
  }
  console.log("---JSON RESPOSE---");
  console.log(json_response);
  socket.io.emit("activity_url", json_response);
  resp.render('activity', json_response);
}


module.exports = activity