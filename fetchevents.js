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
var dir = './_data';
var filename = '/events.json';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}
var ws = fs.createWriteStream(dir+filename);

// Start the request
request(options).on('error', function (error) {
  console.log(error);
}).on('close', function () {
  console.log('Done');
}).pipe(ws);
