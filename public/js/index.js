var socket = io();
socket.on('connect', () => {
  console.log('Connected to server!');

  socket.emit('createEmail', {
    to: 'to@example.com',
    text: 'Hey. This is new Email.'
  });

  socket.emit('createMessage', {
    to: 'to@example.com',
    text: 'I creating a new message for you.'
  });

});

socket.on('disconnect', () => {
  console.log('Disconnected from server!');
});

socket.on('newEmail', (email) => {
  console.log('new Email: ', email);
})

socket.on('newMessage', (msg) => {
  console.log('new Message: ', msg);
})