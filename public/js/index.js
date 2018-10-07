var socket = io();
socket.on('connect', () => {
  console.log('Connected to server!');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server!');
});

socket.on('newMessage', (msg) => {
  var formattedTime = moment(msg.createdAt).format('h:mm a');

  var li = jQuery('<li></li>');
  li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
  jQuery('#messages').append(li);

});

socket.on('newLocationMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

// send location
var locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your Browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition((position) => {

    locationButton.removeAttr('disabled').text('Send Your Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationButton.removeAttr('disabled').text('Send Your Location');
    alert('Unable to fetch location');
  });
})


