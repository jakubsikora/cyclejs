const http = require('http');
const express = require('express');
const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/static', express.static(`${__dirname}/dist`));
app.use('/assets', express.static(`${__dirname}/assets`));
app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

const server = new http.Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;

import Game from './server/game';

server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

const game = new Game(io);

const connectionHandler = socket => {
  game.setEventsHandler(socket);
};

io.on('connection', connectionHandler);
