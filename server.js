import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import configWP from './webpack.config';
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
import getUsers from './src/func/getUsers';
import { REDIRECT_HTTP, IP, LOCAL_MONGO, USERS_COLLECTION } from './config.js';
import createEventStore from 'resolve-es';
import createStorage from 'resolve-storage';
import createBus from 'resolve-bus';
import storageDriver from 'resolve-storage-mongo';
import busDriver from 'resolve-bus-memory';

var app = new express();
var server = http.Server(app);
var io = new socketIO(server);
var compiler = webpack(configWP);
var subscribe = event_store.subscribe;
var eventStore = event_store.eventStore;
var MongoClient = mongodb.MongoClient;
var port = 1000;

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: configWP.output.publicPath }));
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
const usersEventStore = createEventStore({
    storage: createStorage({
        driver: storageDriver({
            url: LOCAL_MONGO,
            collection: USERS_COLLECTION
        })
    }),
    bus: createBus({
        driver: busDriver()
    })
});
const usersProjection = {
    name: 'users',
    initialState: Immutable({}),

    eventHandlers: {
        UserCreated(state, event) {
            const id = event.aggregateId;
            return state.setIn([id], makeUserFromEvent(id, event.payload));
        },

        UserUpdated(state, event) {
            const id = event.aggregateId;
            return state[id]
                ? state.merge(
                    {
                        [id]: makeUserFromEvent(id, event.payload)
                    },
                      { deep: true }
                  )
                : state;
        },

        UserDeleted(state, event) {
            const id = event.aggregateId;
            if (!state[id]) {
                return state;
            }

            return state.without(id);
        }
    }
};
const executeUsers = query({
  usersEventStore,
  projections: [usersProjection]
});

app.get('/infopanel-message/', function (req, res) {
  let user = '';
  try {
     user = jwt.verify(req.cookies[`InfoPanel-token`], 'test-jwt-secret');
  } catch(error) {
     res.redirect(`/infopanel-message/login`);
  }
  fs.readFile('./index.html', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    executeQuery('records').then(state => {
      let recordList = Immutable({ records: [] });

      for(var key = state.records.length - 1; key >= 0; key--){
        if(state.records[key].record.messageAuthor == user.upn) {
          recordList = recordList.setIn(
            ['records'],
            [{
                aggregateId: state.records[key].aggregateId,
                record: state.records[key].record
            }].concat(recordList.records)
          );
        }
      }
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
                eventType:''
              }
            }
            db.close();            
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

app.get('/infopanel-message/clearCookies', (req, res) => {
  res.clearCookie(`InfoPanel-token`)
  res.redirect(`/infopanel-message/`);
});
// /* for testing */
app.get(`/infopanel-message/login`, (req, res) => {
  res.sendFile(__dirname + '/login.html')
});

app.get(`/infopanel-message/auth`, (req, res) => {
    const token = jwt.sign({
      upn: 'test@test.com',
      //upn: 'Max',
      name: 'testName'
    }, 'test-jwt-secret')
    res.redirect(`/infopanel-message/auth/callback?token=${token}`)
});

app.get(`/infopanel-message/auth/callback`, (req, res) => {
  res.cookie(`InfoPanel-token`, req.query.token, {
    maxAge: 86400000,
    httpOnly: true
  })
  res.redirect(`/infopanel-message/`)
});
/**/
/*for azura auth*/
// app.get(`/infopanel-message/auth`, (req, res) => {
//   res.redirect(
//     `${REDIRECT_HTTP}/login?redirect=http://${IP}:${port}/infopanel-message/auth/callback`
//   )
// });
// app.get(`/infopanel-message/auth/callback`, (req, res) => {
//   res.cookie(`InfoPanel-token`, req.query.token, {
//     maxAge: 86400000,
//     httpOnly: true
//   })
//   res.redirect(`/infopanel-message/`)
// });
/**/
app.get('/infopanel-message/api/queries/:queryName', (req, res) => {
  console.log("get");
  executeQuery(req.params.queryName)
    .then(state => { console.log(req.params.queryName); res.status(200).json(state) })
    .catch(err => {
      res.status(500).end('Query error: ' + err.message);
      console.log(err);
    });
});

app.post('/infopanel-message/api/commands', function (req, res) {
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