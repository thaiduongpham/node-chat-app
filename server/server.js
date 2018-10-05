const path = require('path');
const http = require('http');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000; // setup for heroku as prod env
var app = express();
var server = http.createServer(app);

const socketIO = require('socket.io');
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newEmail', {
    from: 'duong@example.com',
    text: 'Hey. What is going on',
    createAt: 123
  });

  socket.emit('newMessage', {
    from: 'duong@example.com',
    text: 'Hey. This is a new message',
    createAt: 333
  });
  
  socket.on('createMessage', (newMessage) => {
    console.log('newMessage: ', newMessage);
  })

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail: ', newEmail);
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });

});

app.use(express.static(publicPath)); // serve index.html in public folder

server.listen(port, () => { // http.createServer run behind the scene 
  console.log(`Server is up on port ${port}`);
});
