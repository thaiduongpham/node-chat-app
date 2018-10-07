const moment = require('moment'); // see more momentjs.com docs

var date = moment();
// date.add(100, 'year');
// console.log(date.format('MMM Do, YYYY'));

// console.log(date.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
