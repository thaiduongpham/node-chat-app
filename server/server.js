const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000; // setup for heroku as prod env
var app = express();

app.use(express.static(publicPath)); // serve index.html in public folder

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
