var socket = io();
socket.on('connect', () => {
  console.log('Connected to server!');

  // socket.emit('createMessage', {
  //   to: 'to@example.com',
  //   text: 'I creating a new message for you.'
  // }, function(data) {
  //   console.log('got it: ', data);  
  // });

});

socket.on('disconnect', () => {
  console.log('Disconnected from server!');
});

socket.on('newMessage', (msg) => {
  console.log('new Message: ', msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);

});

jQuery( document ).ready(function() {

  jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
    }, function () {

    });

  });



});

