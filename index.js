var express = require('express');
var app = express();
var path = require("path");
var MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));

  MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
    var collection = db.collection('requests');
    collection.insert({ first_name: "Arsen", last_name: "Gasparyan", phone: "999808630" }, function(err, result) {});

    db.close();
  });
});

app.get('/go', function (req, res) {
  res.sendFile(path.join(__dirname+'/go.html'));

});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
