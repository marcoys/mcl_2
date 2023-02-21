const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
let multer = require('multer');
app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.urlencoded({extended: true}))
require('dotenv').config();

// db 세팅
var db;
MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true }, function (err, client) {
	if (err) return console.log(err);
	db = client.db('myclassiclist');

	app.listen(process.env.PORT, function() {
    console.log('listening on 8080')
  });
});

// multer 세팅
var storage = multer.diskStorage({
  destination : function(req, file, cb) {
    cb(null, '../client/public/images')
  },
  filename : function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage : storage,
  fileFilter : function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error('PNG, JPG만 업로드하세요'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

//


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/src/App.js'))
});

app.get('/showlist', function(req, res) {
  db.collection('showlist').find().toArray((err, result) => {
    console.log(result);
    res.send(result)
  })
});

app.post('/addshow', upload.single('poster'), function(req, res) {

  const artist = req.body.artist;
  const location = req.body.location;
  const date = req.body.date;
  const time = req.body.time;
  const seat = req.body.seat;
  const price = req.body.price;
  const poster = req.file == undefined ? 'noimage.gif' : req.file.filename; // 디폴트 이미지 설정
  const program = {artist: req.body.programArtist, title: req.body.programTitle};
  const anchor = {artist: req.body.anchorArtist, title: req.body.anchorTitle};
  
  db.collection('counter').findOne({name: '게시물갯수'}, function(err, result) {
    const totalCount = result.totalCount;
    const addData = { _id: totalCount + 1, artist: artist, location: location, date: date, time: time, seat: seat, price: price, poster: poster, program: program, anchor: anchor }

    db.collection('showlist').insertOne(addData, function(err, res) {
      db.collection('counter').updateOne({name: '게시물갯수'}, { $inc: {totalCount: 1}}, function(err, res) {
        if(err) {return console.log(err)}
      })
    })
  })
  res.write('<script>alert("ok")</script>');
  res.write('<script>window.location=\"/\"</script>')
})

app.get('/images/:imageName', function(req, res) {
  res.sendFile(__dirname + '/images/' + req.params.imageName)
})


// 리액트 라우팅 전권
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});