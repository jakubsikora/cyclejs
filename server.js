var webpack = require('webpack');
var express = require('express');

var app = new (express)();
var port = process.env.PORT || 3000;

app.use('/static', express.static(__dirname + '/dist'));
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});