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
const rooms = [];

// Helpers
const debug = function (output) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const dateText = `${year}-${month}-${day}`;

  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  const timeText = `${hours}:${minutes}:${seconds}`;

  console.log(`${dateText} ${timeText} - ${output}`);
};

// Socket IO shortcuts
const sendToClient = (socket, type, data) => socket.emit(type, data);
const sendToOthers = (socket, type, data) => socket.broadcast.emit(type, data);
const sendToAll = (type, data) => io.sockets.emit(type, data);

const getRoom = function (name) {
  return rooms.filter(room => room.name === name)[0];
};

const createRoom = function (name) {
  debug(`New room: "${name}" has been created.`);

  rooms.push({
    name,
    users: [],
  });
};

const joinRoom = function (name, user, socket) {
  rooms.some(room => {
    if (room.name === name) {
      room.users.push(user);

      socket.join(room.name);
      socket.room = room.name;

      debug(`"${user.username}" joined the ${room.name}.`);

      return true;
    }

    return false;
  });
};

const leaveRoom = function (name, username, socket) {
  socket.leave(name);

  rooms.some((room, roomIndex) => {
    if (room.name === name) {
      room.users.some((user, index) => {
        if (user.username === username) {
          room.users.splice(index, 1);

          if (!room.users.length) {
            rooms.splice(roomIndex, 1);
          }

          return true;
        }

        return false;
      });

      return true;
    }

    return false;
  });

  sendToAll('updaterooms', rooms);
};

// Socket IO callbacks
const onAddUser = function (data) {
  // Update default room
  const user = {
    id: this.id,
    username: data.username,
  };

  users.push(user);

  this.user = user;

  joinRoom(DEFAULT_ROOM, user, this);

  // User
  sendToClient(this, 'adduser', user);
  sendToClient(this, 'updateusers', users);
  sendToOthers(this, 'updateusers', users);

  // Room
  sendToClient(this, 'addroom', getRoom(DEFAULT_ROOM));
  sendToClient(this, 'updaterooms', rooms);
  sendToOthers(this, 'updaterooms', rooms);
};

const onCreateRoom = function (data) {
  if (this.room !== DEFAULT_ROOM) {
    leaveRoom(this.room, this.user.username, this);
  }

  createRoom(data.name);
  joinRoom(data.name, this.user, this);

  sendToClient(this, 'addroom', getRoom(data.name));
  sendToClient(this, 'updaterooms', rooms);
  sendToOthers(this, 'updaterooms', rooms);
};

const onDisconnect = function () {
  users.some((user, index) => {
    if (user.username === this.user.username) {
      users.splice(index, 1);

      debug(`"${user.username}" left the ${this.room}.`);
      return true;
    }

    return false;
  });

  // Send to all clients
  sendToAll('updateusers', users);

  leaveRoom(this.room, this.user.username, this);
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

createRoom(DEFAULT_ROOM);

io.on('connection', setEventsHandler);
