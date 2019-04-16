var request = require('request');
var querystring = require('querystring');


module.exports = function(req, res) {
    var spawn = require("child_process").spawn;
    console.log("Here");
    console.log("There");
          var process = spawn('python', ["./main.py",
            // newUser.username,
            req.body.email,
            req.body.msg,
          ]);
          // console.log(process);
          console.log("ended")
          // res.json({success:true, msg : 'successfully registerd\n'})
          process.stdout.on('data', function (data) {
            // let a = data.toString();
            console.log("in here")
            var str = data.toString();
            console.log(str);
            res.json({ mailData: data });
            // var arr = str.split("\n");
            // arr = arr.map(function (val) { return parseFloat(val); });
            // console.log(arr);
          });
}

