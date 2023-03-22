'use strict';
const http = require('http');
const url = require('url');

const MAX_REQUEST_SIZE = 1 * 1024 * 1024; // 1 MB

// Create http server.
let server = http.createServer((req, res) => {
  if (req.method == "POST") {
    var postData = '';
    req.on('data', function (chunk) {
      if (postData.length + chunk.length > MAX_REQUEST_SIZE) {
        console.error('Request too large.');
        req.abort();
      } else {
        postData += chunk;
      }
    });

    req.on('end', function () {
      try {
        console.log(req.socket.remoteAddress + ": " + postData);
      } catch (err) {
        console.error('Error while logging data: ' + err.message);
      }
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
  
  try {
    res.writeHead(200);
    res.end();
  } catch (err) {
    console.error('Error while sending response: ' + err.message);
  }
});

try {
  server.listen(5007);
  console.log('Listening on http://localhost:5007/');
} catch (err) {
  console.error('Error while starting server: ' + err.message);
}
