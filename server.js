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
const rooms = [{
  name: DEFAULT_ROOM,
  numberOfPlayers: 0,
}];

// Helpers
const decreasePlayersFromRoom = (socket) => {
  // Decrease number of users in the room
  const socketRoom = rooms.filter(room => room.name === socket.room.name)[0];
  socketRoom.numberOfPlayers--;
};

// Socket IO shortcuts
const sendToClient = (socket, type, data) => socket.emit(type, data);
const sendToOthers = (socket, type, data) => socket.broadcast.emit(type, data);
const sendToAll = (type, data) => io.sockets.emit(type, data);

// Socket IO callbacks
const onAddUser = function (data) {
  const user = {
    username: data.username,
    room: rooms[0],
    isLocal: false,
  };

  // Update default room
  rooms[0].numberOfPlayers++;

  users.push(user);

  this.username = user.username;
  this.room = rooms[0];

  this.join(rooms[0].name);

  sendToClient(this, 'adduser', Object.assign({}, user, { isLocal: true }));
  // sendToClient(this, 'updaterooms', { rooms, currentRoom: this.room });
  // sendToOthers(this, 'adduser', { ...user });
  // sendToOthers(this, 'updaterooms', { rooms });
};

const onCreateRoom = function (data) {
  rooms.push({
    name: data.name,
    numberOfPlayers: 1,
  });

  decreasePlayersFromRoom(this);

  sendToClient(this, 'updaterooms', { rooms, currentRoom: this.room });
  sendToOthers(this, 'updaterooms', { rooms });
};

const onDisconnect = function () {
  users.forEach((user, index) => {
    if (user.username === this.username) {
      users.splice(index, 1);
    }
  });

  // Send to all clients
  sendToAll('updateusers', { users });

  decreasePlayersFromRoom(this);
  this.leave(this.room);
  sendToAll('updaterooms', { rooms });
};

const onDispatch = function (data) {
  sendToOthers(this, 'dispatch', data);
};

const onPing = function () {
  sendToClient(this, 'pong');
};

const setEventsHandler = (socket) => {
  socket.on('adduser', onAddUser);
  socket.on('createroom', onCreateRoom);
  socket.on('disconnect', onDisconnect);
  socket.on('dispatch', onDispatch);
  socket.on('ping-client', onPing);
};

server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

io.on('connection', setEventsHandler);
