const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000; // setup for heroku as prod env
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });

});

app.use(express.static(publicPath)); // serve index.html in public folder

server.listen(port, () => { // http.createServer run behind the scene 
  console.log(`Server is up on port ${port}`);
});
