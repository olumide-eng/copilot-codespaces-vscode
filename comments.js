// create web server

// import module
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

// create server
var server = http.createServer(function (req, res) {
    // get url
    var pathname = url.parse(req.url).pathname;
    // get file extension
    var extname = path.extname(pathname);
    // get file path
    var realPath = __dirname + pathname;

    // default page
    if (pathname === '/') {
        realPath = __dirname + '/index.html';
    }

    // read file
    fs.readFile(realPath, function (err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('This request URL ' + pathname + ' was not found on this server.');
            res.end();
        } else {
            var contentType = getContentType(extname);
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.write(data);
            res.end();
        }
    });
});

// listen port 8080
server.listen(8080);
console.log('Server running at http://80080');

