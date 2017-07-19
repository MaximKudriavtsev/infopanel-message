import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import bodyParser from 'body-parser';
import fs from 'fs';
import cookieParser  from 'cookie-parser';
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import jwt from 'jsonwebtoken';
import mongodb from 'mongodb';
import assert from 'assert';
import event_store from './src/store/event_store';
import config from './resolve.config.js';
import commandHandler from 'resolve-command';
import query from 'resolve-query';
import Immutable from 'seamless-immutable';

var app = new express();
var server = http.Server(app);
var io = new socketIO(server);
var compiler = webpack(config);
var subscribe = event_store.subscribe;
var eventStore = event_store.eventStore;
var MongoClient = mongodb.MongoClient;
var port = 3000;

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.get('/', function (req, res) {
  let user = '';
  try {
     user = jwt.verify(req.cookies[`InfoPanel-token`], 'test-jwt-secret');
  } catch(error) {
     res.redirect(`/Login`);
  }
  fs.readFile('./index.html', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    executeQuery('records').then(state => {
      //create client global id! new aggregate id
      let aggregateId = 0,
        recordList = Immutable({ records: [] });
      for(var key = state.records.length - 1; key >= 0; key--){
        console.log('upn ' + user.upn)
        console.log(state.records[key].record.messageAuthor);
        if(state.records[key].record.messageAuthor == user.upn) {
          recordList = recordList.setIn(
            ['records'],
            [{
                aggregateId: state.records[key].aggregateId,
                record: state.records[key].record
            }].concat(recordList.records)
          );
          if(state.records[key].aggregateId > aggregateId){
            aggregateId = state.records[key].aggregateId;
          }
        }
      }
      ++aggregateId;
      MongoClient.connect(config.storage.params.url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        db.collection('userList')
          .find({ corName: 'userList' })
          .map(function(item) { return {name: item.name, surname: item.surname}; } )
          .toArray()
          .then((users) => {
            let userList = getUsers(users);
            let serverState = {
              server: recordList,
              client: {
                id: -1,
                text: '',
                author: user.name,
                fullNameAuthor: user.name,
                location: '',
                eventDate: new Date(),
                startDate: new Date(),
                messageAuthor: user.upn,
                messageDate: '',
                authorList: userList,
                focusRow: '',
                aggregateId: aggregateId,
                dayRange: 0
              }
            }
            var result = data.replace(/{{PRELOADED_STATE}}/g, JSON.stringify(serverState));
            db.close();
            res.send(result);
          });
      });
    }).catch(err => {
      console.log('Query error: ' + err.message);
      console.log(err);
    });
  });
});

app.get('/ClearCookies', (req, res) => {
  res.clearCookie(`InfoPanel-token`)
  res.redirect(`/`);
});
/* for testing */
app.get(`/Login`, (req, res) => {
  res.sendFile(__dirname + '/login.html')
});

app.get(`/auth`, (req, res) => {
    const token = jwt.sign({
      upn: 'test@test.com',
      //upn: 'Max',
      name: 'testName'
    }, 'test-jwt-secret')
    res.redirect(`/auth/callback?token=${token}`)
});

app.get(`/auth/callback`, (req, res) => {
  res.cookie(`InfoPanel-token`, req.query.token, {
    maxAge: 86400000,
    httpOnly: true
  })
  res.redirect(`/`)
});
/**/
/*for azura auth*/
// app.get(`/auth`, (req, res) => {
//   res.redirect(
//     `http://172.22.6.135:9000/login?redirect=http://172.22.11.62:3000/auth/callback`
//   )
// });
// app.get(`/auth/callback`, (req, res) => {
//   res.cookie(`InfoPanel-token`, req.query.token, {
//     maxAge: 86400000,
//     httpOnly: true
//   })
//   res.redirect(`/`)
// });
/**/
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