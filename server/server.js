const path = require('path');
const http = require('http');
const express = require('express');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000; // setup for heroku as prod env
var app = express();
var server = http.createServer(app);

const socketIO = require('socket.io');
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined!'));

  socket.on('createMessage', (message, callback) => {
    console.log('newMessage: ', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');

    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.to,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });

  });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail: ', newEmail);
  // })

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });

});

app.use(express.static(publicPath)); // serve index.html in public folder

server.listen(port, () => { // http.createServer run behind the scene 
  console.log(`Server is up on port ${port}`);
});
