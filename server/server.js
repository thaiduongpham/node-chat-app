const path = require('path');
const http = require('http');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000; // setup for heroku as prod env
var app = express();
var server = http.createServer(app);

const socketIO = require('socket.io');
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
  console.log('New user connected');
  
  
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name & room name is required.');
    }
  
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // socket.leave('The Office Fans');
    // io.emit -> io.to('The Office Fans').emit
    // socket.broadcast.emit -> socket.to('The Office Fans').emit
    // socket.emit -> only individual User

    socket.to(params.room).emit('newMessage', generateMessage('Admin', 'Welcome to Chat App!'));  
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('newMessage: ', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}`, `${coords.longitude}`));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });

});

app.use(express.static(publicPath)); // serve index.html in public folder

server.listen(port, () => { // http.createServer run behind the scene 
  console.log(`Server is up on port ${port}`);
});
