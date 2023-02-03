const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));
require('dotenv').config();

var db;
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true }, function (err, client) {
	if (err) return console.log(err);
	db = client.db('myclassiclist');

	app.listen(process.env.PORT, function() {
    console.log('listening on 8080')
  });
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
});

app.get('/showlist', function(req, res) {
  db.collection('showlist').find().toArray((err, result) => {
    console.log(result);
    res.send(result)
  })
})