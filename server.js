const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
let multer = require('multer');
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use(express.static(path.join(__dirname, 'client/build')));
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
    cb(null, './client/build/images')
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

// 로그인
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { randomBytes } = require('crypto');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized : false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', {
  failureRedirect : '/fail',
  failureMessage: true
}), function(req, resp) {
  resp.redirect('/');
});

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (insertId, insertPw, done) {
  //console.log(insertId, insertPw);
  db.collection('user').findOne({ id: insertId }, function (err, res) {
    if (err) return done(err)

    if (!res) return done(null, false, { message: '존재하지않는 아이디요' })
    if (insertPw == res.pw) {
      return done(null, res)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, {});
});

app.get('/logincheck', 로그인했니, function(req, res) {
  res.send('login')
});

// 로그인여부 미들웨어 작동 후, 서버에서 클라이언트로 로그인 유무값만 전송

function 로그인했니(req, res, next) {
  if(req.user) {
    next()
  } else {
    res.send('로그인하세요');
  }
}



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
});

app.get('/showlist', function(req, res) {
  db.collection('showlist').find().toArray((err, result) => {
    // console.log(result);
    res.json(result)
  })
});

app.get('/search', (req, res) => {
  let searchRule = [
    {
      $search: {
        index: 'artistSearch',
        text: {
          query: req.query.value,
          path: "artist"
        }
      }
    },
    { $sort : { _id : -1 }}
  ]
  console.log(req.query);
  db.collection('showlist').aggregate(searchRule).toArray((err, result) => {
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

  console.log(req.file)
  
  db.collection('counter').findOne({name: '게시물갯수'}, function(err, result) {
    const totalCount = result.totalCount;
    const addData = { _id: totalCount + 1, artist: artist, location: location, date: date, time: time, seat: seat, price: price, poster: poster, program: program, anchor: anchor }
    
    db.collection('showlist').insertOne(addData, function(err, res) {
      db.collection('counter').updateOne({name: '게시물갯수'}, { $inc: {totalCount: 1}}, function(err, res) {
        if(err) {return console.log(err)}
      })
    })
  })

  res.write('<script>alert("OK")</script>');
  res.write('<script>window.location=\"/\"</script>')
})

app.get('/images/:imageName', function(req, res) {
  res.sendFile(__dirname + '/client/build/images/' + req.params.imageName)
})

app.delete('/delete', function(req, res) {
  db.collection('showlist').deleteOne({ _id: parseInt(req.body._id) }, function(err, res) {
    console.log('삭제완료');
  })
  res.send();
})

app.get('/edit/:id', function(req, res) {
  db.collection('showlist').findOne({_id: parseInt(req.params.id)}, function(err, result) {
    if(result == null) { res.send('없는 페이지입니다') }
    res.send(result);
  })
})

app.put('/edit', upload.single('poster'), function(req, res) {
  const artist = req.body.artist;
  const location = req.body.location;
  const date = req.body.date;
  const time = req.body.time;
  const seat = req.body.seat;
  const price = req.body.price;
  const poster = req.file == undefined ? req.body.dafaultImg : req.file.filename; // 디폴트 이미지 설정
  const program = {artist: req.body.programArtist, title: req.body.programTitle};
  const anchor = {artist: req.body.anchorArtist, title: req.body.anchorTitle};

  db.collection('showlist').updateOne({ _id : parseInt(req.body.id) }, { $set : {artist: artist, location: location, date: date, time: time, seat: seat, price: price, poster: poster, program: program, anchor: anchor }}, function(err, result) {
    if (err) {return console.log(err)}
    console.log(req.body.id)
    console.log('수정완료')
    res.redirect('/');
  })
})



// 리액트 라우팅 전권
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});