'use strict';
const http = require('http');
const url = require('url');

// Create http server.
let server = http.createServer((req, res) => {
  if (req.method == "POST") {
    var postData = '';
    req.on('data', function (chunk) {
      postData += chunk;
    });

    req.on('end', function () {
      console.log(req.socket.remoteAddress + ": " + postData);
    });

    req.setTimeout(10000, function() {
      console.error('Request timed out.');
      req.abort();
    });

    req.on('error', function (err) {
      console.error(err);
      req.abort();
    });
  }
  res.writeHead(200);
  res.end();
});

server.listen(5007);
console.log('Listening on http://localhost:5007/');
