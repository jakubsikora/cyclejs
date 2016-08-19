const http = require('http');
const express = require('express');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

// Create the app, setup the webpack middleware
const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/static', express.static(__dirname + '/dist'));
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

const server = new http.Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 8080;
const users = [];

const DEFAULT_ROOM = 'Lobby';
const rooms = [DEFAULT_ROOM];

server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

io.on('connection', function (socket) {
  socket.on('adduser', function (username) {
    users.push({
      username,
      room: DEFAULT_ROOM,
    });

    console.log(`${users.length} user(s) connected`);

    socket.username = username;
    socket.room = DEFAULT_ROOM;
    socket.join(DEFAULT_ROOM);

    // Send message back to the socket which starts.
    socket.emit('updateusers', users);

    // Send message to all users except for the socket that starts it.
    socket.broadcast.emit('updateusers', users);
  });

  socket.on('disconnect', function () {
    users.splice(users.indexOf(socket.io));
    console.log(`user ${socket.id} disconnected. ${users.length} user(s) connected`);
  });
});
