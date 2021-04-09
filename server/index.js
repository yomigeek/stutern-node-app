var express = require('express');
var app = express();
app.get('/', function (req, res) {
   res.send('WELCOME TO OUR API');
})
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App Started: ", port)
})