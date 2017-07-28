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
import recordsStore from './src/store/recordsStore';
import usersStore from './src/store/usersStore';
import config from './resolve.config.js';
import { REDIRECT_HTTP, IP, APPLICATION_NAME } from './config.js';
import commandHandler from 'resolve-command';
import query from 'resolve-query';

var appName = APPLICATION_NAME;
var app = new express();
var server = http.Server(app);
var io = new socketIO(server, {
  path: '/infopanel-message/soket.io'
});
var compiler = webpack(configWP);
var subscribe = recordsStore.subscribe;
var eventStore = recordsStore.eventStore;
var port = 1000;

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: configWP.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(`/${appName}/static`, express.static('public'))

const executeQuery = query({
  eventStore,
  projections: config.queries
});
const executeCommand = commandHandler({
  eventStore,
  aggregates: config.aggregates
});

const executeUsers = query({
  eventStore: usersStore.usersEventStore,
  projections: [usersStore.usersProjection]
});

app.get(`/${appName}/`, function (req, res) {
  let user = '';
  try {
    user = jwt.verify(req.cookies[`InfoPanel-token`], 'test-jwt-secret');

    fs.readFile('./index.html', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      Promise.all([
        executeQuery('records'),
        executeUsers('users')
      ]).then(([records, users]) => {
          const usersList = Object.keys(users).map(key => users[key]);
          let userName;
          if(user.displayName){
            userName = user.displayName.split(' (')[0];
          } else {
            for(var key in usersList) {
              if (usersList[key].email == user.upn){
                userName = usersList[key].displayName;
                break;
              }
            }
          }

          let serverState = {
            server: records,
            client: {
              id: 0,
              text: '',
              author: user.upn,
              fullNameAuthor: userName,
              displayName: userName,
              location: '',
              eventDate: new Date(),
              startDate: new Date(),
              messageAuthor: user.upn,
              messageDate: '',
              authorList: usersList,
              focusRow: '',
              eventType:''
            }
          }
          var result = data.replace(/{{PRELOADED_STATE}}/g, JSON.stringify(serverState));
          res.send(result);
      }).catch(err => {
        console.log('Query error: ' + err.message);
        console.log(err);
      });
    });
   } catch(error) {
     res.redirect(`/${appName}/auth`);
  }
});

app.get(`/${appName}/clearCookies`, (req, res) => {
  res.clearCookie(`InfoPanel-token`)
  res.redirect(`/${appName}/`);
});
/* for testing */
app.get(`/infopanel-message/login`, (req, res) => {
  res.sendFile(__dirname + '/login.html')
});

app.get(`/infopanel-message/auth`, (req, res) => {
    const token = jwt.sign({
      //upn: 'test@test.com',
      upn: 'Max',
      displayName: 'testName'
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
/*END for testing*/
/*for azura auth*/
// app.get(`/${appName}/auth`, (req, res) => {
//   res.redirect(
//     `${REDIRECT_HTTP}/login?redirect=http://${IP}:${port}/${appName}/auth/callback`
//   )
// });
// app.get(`/${appName}/auth/callback`, (req, res) => {
//   res.cookie(`InfoPanel-token`, req.query.token, {
//     maxAge: 86400000,
//     httpOnly: true
//   })
//   res.redirect(`/${appName}/`)
// });

/*END for azura auth*/
app.get(`/${appName}/api/queries/:queryName`, (req, res) => {
  executeQuery(req.params.queryName)
    .then(state => { console.log(req.params.queryName); res.status(200).json(state) })
    .catch(err => {
      res.status(500).end('Query error: ' + err.message);
      console.log(err);
    });
});

app.post(`/${appName}/api/commands`, function (req, res) {
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