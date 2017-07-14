var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = new (require('express'))();
var server = require('http').Server(app);
//должен включиться Socket.io server на порте 3000
var io = new (require('socket.io'))(server);

var port = 3000;

//var userList = require('./userList.json');
var userRecords = require('./userRecords.json');

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

// Connection URL
var uri = 'mongodb://InfoPanel:d221241M@noomid-shard-00-00-uso0b.mongodb.net:27017,noomid-shard-00-01-uso0b.mongodb.net:27017,noomid-shard-00-02-uso0b.mongodb.net:27017/events?ssl=true&replicaSet=NooMID-shard-0&authSource=admin';

var event_store = require('./src/store/event_store');
var subscribe = event_store.subscribe;
var eventStore = event_store.eventStore;
var config = require('./resolve.config.js');
import commandHandler from 'resolve-command';
import query from 'resolve-query';

const executeQuery = query({
  eventStore,
  projections: config.queries
});

const executeCommand = commandHandler({
  eventStore,
  aggregates: config.aggregates
});

function getUsers(data) {
  var usersList = [];
  for (var key in data) {
    usersList.push(data[key].name + ' ' + data[key].surname);
  }
  return usersList;
}

function getRecords(data) {
  function getCorrectDate(time) {
    var date,
      day, month, hours, min,
      getDay, getMonth, getHours, getMinutes;

    date = new Date(time);
    getDay = date.getDate().toString();
    getMonth = (date.getMonth() + 1).toString();
    getHours = date.getHours().toString();
    getMinutes = date.getMinutes().toString();

    day = getDay.length == 1 ? '0' + getDay : getDay;
    month = getMonth.length == 1 ? '0' + getMonth : getMonth;
    hours = getHours.length == 1 ? '0' + getHours : getHours;
    min = getMinutes.length == 1 ? '0' + getMinutes : getMinutes;
    return (day + '.' + month + '.' + date.getFullYear() + ' ' + hours + ':' + min);
  }

  var recordList = [];

  for (var key in data) {
    recordList.push(data[key]);

    recordList[key].correctEventDate = getCorrectDate(recordList[key].eventDate);
    recordList[key].correctStartDate = getCorrectDate(recordList[key].startDate);
  }
  return recordList;
}
const findUsers = function (db, callback) {
  return db.collection('userList')
    .find({ corName: 'userList' })
    .toArray();
}

function users() {
  MongoClient.connect(config.storage.params.url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    let userList = findUsers(db, db.close());

    console.log(userList + ' after db');

    console.log('db disconect');

    return userList;
  });
}
app.get('/', function (req, res) {
  fs.readFile('./index.html', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    executeQuery('records').then(state => {

      let serverState = {
        server: state,
        client: {
          id: '',
          text: '',
          author: 'Max',
          location: '',
          eventDate: new Date(),
          startDate: new Date(),
          messageAuthor: 'Max',
          messageDate: '',
          //authorList: getUsers(userList),
          authorList: users(),
          focusRow: ''
        }
      }

      var result = data.replace(/{{PRELOADED_STATE}}/g, JSON.stringify(serverState));
      res.send(result);
    }).catch(err => {
      console.log('Query error: ' + err.message);
      console.log(err);
    });
  });
});

app.get('/api/queries/:queryName', (req, res) => {
  console.log("get");
  executeQuery(req.params.queryName)
    .then(state => { console.log(req.params.queryName); res.status(200).json(state) })
    .catch(err => {
      res.status(500).end('Query error: ' + err.message);
      console.log(err);
    });
});

app.post('/api/commands', function (req, res) {
  console.log("post");
  executeCommand(req.body)
    .then(function () {
      res.status(200).send('ok');
    }).catch(function (err) {
      res.status(500).end('Command error:' + err.message);
      console.log(err);
    });
});

// app.get('/query_users', function (req, res) {
//   //query from db
//   res.send(userList);
// });

// app.get('/query_user_records', function (req, res) {
//   //query from db
//   res.send(userRecords);
// });

// app.post('/update_data', function (req, res, next) {
//   res.send('=> /update_data');
//   //post query to db
//   console.log('=> /update_data');
//   console.log(req.body);

//   io.emit('action', { type: 'RECORD_DID_UPDATED' });
// });

// app.post('/create_data', function (req, res, next) {
//   res.send('=> /create_data');
//   //post query to db
//   console.log('=> /create_data');
//   console.log(req.body);

//   io.emit('action', { type: 'RECORD_DID_CREATED' });
// });

// app.post('/delete_data', function (req, res, next) {
//   res.send('=> /delete_data');
//   //post query to db
//   console.log('=> /delete_data');
//   console.log(req.body);

//   io.emit('action', { type: 'RECORD_DID_DELETED' });
// });

server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});

io.on('connection', function (socket) {
  console.log("Socket connected: " + socket.id);
  //socket.emit('news', {data:'good day!'});
  // io.on('action', function (action) {
  //   if (action.type === 'server/hello') {
  //     console.log('Got hello data!', action.data);
  //     socket.emit('action', { type: 'message', data: 'good day!' });
  //   }
  // });
  const eventsNames = Object.keys(config.events).map(function (key) {
    return config.events[key];
  });
  const unsubscribe = subscribe(eventsNames, function (event) {
    socket.emit('event', JSON.stringify(event));
  });
  socket.on('disconnect', unsubscribe);
});