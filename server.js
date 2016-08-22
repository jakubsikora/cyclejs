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

// Socket IO shortcuts
const sendToClient = (socket, type, data) => socket.emit(type, data);
const sendToOthers = (socket, type, data) => socket.broadcast.emit(type, data);
const sendToAll = (type, data) => io.sockets.emit(type, data);

// Helpers
const decreasePlayersFromRoom = (socket) => {
  // Decrease number of users in the room
  const socketRoom = rooms.filter(room => room.name === socket.room.name)[0];
  socketRoom.numberOfPlayers--;
};

server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

io.on('connection', function (socket) {
  socket.on('adduser', function (username) {
    // Update default room
    rooms[0].numberOfPlayers++;

    users.push({
      username,
      room: rooms[0],
    });

    socket.username = username;
    socket.room = rooms[0];
    socket.join(rooms[0].name);

    sendToClient(socket, 'updateusers', { users, currentUser: socket.username });
    sendToClient(socket, 'updaterooms', { rooms, currentRoom: socket.room });
    sendToOthers(socket, 'updateusers', { users });
    sendToOthers(socket, 'updaterooms', { rooms });
  });

  socket.on('createroom', function (name) {
    rooms.push({
      name,
      numberOfPlayers: 1,
    });

    decreasePlayersFromRoom(socket);

    sendToClient(socket, 'updaterooms', { rooms, currentRoom: socket.room });
    sendToOthers(socket, 'updaterooms', { rooms });
  });

  socket.on('disconnect', function () {
    users.forEach((user, index) => {
      if (user.username === socket.username) {
        users.splice(index, 1);
      }
    });

    // Send to all clients
    sendToAll('updateusers', { users });

    decreasePlayersFromRoom(socket);
    socket.leave(socket.room);
    sendToAll('updaterooms', { rooms });
  });
});
