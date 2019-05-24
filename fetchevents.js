'use strict';

const request = require('request');
const fs = require('fs');
const token = 'Bearer ' + process.env.EVENTBRITE_TOKEN;

console.log(process.env);

var options = {
  url: 'https://www.eventbriteapi.com/v3/organizations/217989441861/events/',
  accept: 'application/json',
  headers: {
    'Authorization': token
  },
  qs: {
    'order_by': 'start_desc'
  },
  rejectUnauthorized: false
};
var path = './_data/events.json';
var ws = fs.createWriteStream(path);

// Start the request
request(options).on('error', function (error) {
  console.log(error);
}).on('close', function () {
  console.log('Done');
}).pipe(ws);
