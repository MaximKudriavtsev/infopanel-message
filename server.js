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

var userRecords = require('./userRecords.json');

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

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

app.get('/', function (req, res) {
  fs.readFile('./index.html', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    executeQuery('records').then(state => {
      MongoClient.connect(config.storage.params.url, function (err, db) {
        assert.equal(null, err);
        db.collection('userList')
          .find({ corName: 'userList' })
          .map(function(item) { return {name: item.name, surname: item.surname}; } )
          .toArray()
          .then((users) => {
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
                authorList: users,
                focusRow: ''
              }
            }
            var result = data.replace(/{{PRELOADED_STATE}}/g, JSON.stringify(serverState));
            res.send(result);
          });
      });
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

server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});

io.on('connection', function (socket) {
  console.log("Socket connected: " + socket.id);
  const eventsNames = Object.keys(config.events).map(function (key) {
    return config.events[key];
  });
  const unsubscribe = subscribe(eventsNames, function (event) {
    socket.emit('event', JSON.stringify(event));
  });
  socket.on('disconnect', unsubscribe);
});