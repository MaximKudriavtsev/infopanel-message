var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var bodyParser = require('body-parser');
var fs = require('fs');

var userList = require('./userList.json');
var userRecords = require('./userRecords.json');

// var querys = require('./src/querys/querys');

var app = new (require('express'))();
var port = 3000;

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

function getUsers(data) {
    var usersList = [];
    for (var key in data) {
        usersList.push(data[key].name + ' ' + data[key].surname);
    }
    return usersList;
}

const serverState = {
  id: -1,
  text: '',
  author: '',
  location: '',
  eventDate: new Date(),
  startDate: new Date(),
  messageAuthor: '',
  messageDate: '',
  authorList: getUsers(userList),
  eventList: userRecords,
  focusRow: ''
}

app.get('/', function (req, res) {
  // const rawContent = fs.readFileSync('./index.html');
  // const statefulContent = rawContent.replace('{{PRELOADED_STATE}}', JSON.stringify(serverState));

  fs.readFile('./index.html', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/{{PRELOADED_STATE}}/g, JSON.stringify(serverState));
    res.send(result);
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

// app.post('/send_data', function (req, res, next) {
//   res.send('=> /send_data');
//   //post query to db
//   console.log('=> /send_data');
//   console.log(req.body);
// });


// app.post('/delete_data', function (req, res, next) {
//   res.send('=> /delete_data');
//   //post query to db
//   console.log('=> /delete_data');
//   console.log(req.body);
// });

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});