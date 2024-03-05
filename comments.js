// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments');
var qs = require('querystring');

var server = http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    fs.readFile('./index.html', function (err, data) {
      if (err) {
        res.end('Read file error');
      } else {
        res.end(data);
      }
    });
  } else if (pathname === '/add') {
    var str = '';
    req.on('data', function (data) {
      str += data;
    });
    req.on('end', function () {
      var obj = qs.parse(str);
      comments.push(obj);
      res.end(JSON.stringify(comments));
    });
  } else {
    fs.exists('.' + pathname, function (exists) {
      if (exists) {
        fs.readFile('.' + pathname, function (err, data) {
          if (err) {
            res.end('Read file error');
          } else {
            res.end(data);
          }
        });
      } else {
        res.end('404');
      }
    });
  }
});

server.listen(3000, function () {
  console.log('Listening on 3000');
});
```

#