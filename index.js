var express = require('express');
var app = express();
var path = require("path");
var MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/go', function (req, res) {
  res.sendFile(path.join(__dirname+'/go.html'));
});

app.post('/go', function (req, res) {
  MongoClient.connect("mongodb://127.0.0.1/gettravel", function(err, db) {
    var collection = db.collection('requests');
    var params = { first_name: req.params.first_name,
                    last_name: req.params.last_name,
                        phone: req.params.phone,
                  device_type: req.params.device_type,
                   created_at: new Date() };
    console.log(params)
    collection.insert(params, function(err, result) {});
    db.close();
  });

  res.redirect('/done');
});

app.get('/done', function (req, res) {
  res.sendFile(path.join(__dirname+'/done.html'));
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
