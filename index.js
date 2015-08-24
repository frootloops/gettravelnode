var express = require('express');
var app = express();
var path = require("path");
var pg = require('pg');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/go', function (req, res) {
  res.sendFile(path.join(__dirname+'/go.html'));
});


var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    client.query("CREATE TABLE requests(phone VARCHAR(255), firstname VARCHAR(255), lastname VARCHAR(255));")

});
