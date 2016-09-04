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
const SERVER = 'SERVER';
const games = [];

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

const sendChatMessage = function (data) {
  const date = new Date();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  const timeText = `${hours}:${minutes}:${seconds}`;

  sendToAll('chatmessage', {
    message: data.message,
    user: data.user,
    time: timeText,
    server: data.user === SERVER,
  });
};

const createGame = function (name) {
  debug(`New game: "${name}" has been created.`);

  games.push({
    name,
    users: [],
  });
};

const joinGame = function (name, user, socket) {
  games.some(game => {
    if (game.name === name) {
      game.users.push(user);

      socket.join(game.name);
      socket.game = game.name;

      sendToClient(socket, 'addgame', game);
      sendToClient(socket, 'updategames', games);
      sendToOthers(socket, 'updategames', games);

      debug(`"${user.username}" joined the ${game.name}.`);

      return true;
    }

    return false;
  });
};

const leaveGame = function (name, username, socket) {
  socket.leave(name);

  games.some((game, gameIndex) => {
    if (game.name === name) {
      game.users.some((user, index) => {
        if (user.username === username) {
          game.users.splice(index, 1);

          debug(`"${user.username}" left the ${name}.`);

          if (!game.users.length && game.name !== DEFAULT_ROOM) {
            games.splice(gameIndex, 1);

            debug(`"${game.name}" has been removed.`);

            sendChatMessage({
              message: `"${game.name}" has been removed`,
              user: SERVER,
            });
          }

          return true;
        }

        return false;
      });

      return true;
    }

    return false;
  });

  sendToAll('updategames', games);
};

// Socket IO callbacks
const onAddUser = function (data) {
  const user = {
    id: this.id,
    username: data.username,
  };

  users.push(user);
  this.user = user;

  // User
  sendToClient(this, 'adduser', user);
  sendToClient(this, 'updateusers', users);
  sendToOthers(this, 'updateusers', users);

  joinGame(DEFAULT_ROOM, user, this);

  sendChatMessage({
    message: `${data.username} joined the "${DEFAULT_ROOM}"`,
    user: SERVER,
  });
};

const onCreateGame = function (data) {
  leaveGame(this.game, this.user.username, this);

  sendChatMessage({
    message: `${this.user.username} left the "${this.game}"`,
    user: SERVER,
  });

  createGame(data.name);
  joinGame(data.name, this.user, this);

  sendChatMessage({
    message: `${this.user.username} created "${data.name}"`,
    user: SERVER,
  });
};

const onJoinGame = function (name) {
  leaveGame(this.game, this.user.username, this);

  sendChatMessage({
    message: `${this.user.username} left the "${this.game}"`,
    user: SERVER,
  });

  joinGame(name, this.user, this);

  sendChatMessage({
    message: `${this.user.username} joined the "${name}"`,
    user: SERVER,
  });
};

const onChatMessage = function (message) {
  sendChatMessage({
    message,
    user: this.user.username,
  });
};

const onDisconnect = function () {
  users.some((user, index) => {
    if (user.username === this.user.username) {
      users.splice(index, 1);

      debug(`"${user.username}" removed.`);
      return true;
    }

    return false;
  });

  // Send to all clients
  sendToAll('updateusers', users);

  // Remove player from the lobby
  if (this.game !== DEFAULT_ROOM) {
    leaveGame(DEFAULT_ROOM, this.user.username, this);
  }

  leaveGame(this.game, this.user.username, this);

  sendChatMessage({
    message: `${this.user.username} disconnected`,
    user: SERVER,
  });
};

const onDispatch = function (data) {
  sendToOthers(this, 'dispatch', data);
};

const onPing = function () {
  sendToClient(this, 'pong');
};

const setEventsHandler = (socket) => {
  socket.on('adduser', onAddUser);
  socket.on('creategame', onCreateGame);
  socket.on('joingame', onJoinGame);
  socket.on('disconnect', onDisconnect);
  socket.on('dispatch', onDispatch);
  socket.on('ping-client', onPing);
  socket.on('chatmessage', onChatMessage);
};

server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

createGame(DEFAULT_ROOM);

io.on('connection', setEventsHandler);
