var PORT = 8000;
var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function (request, response) {
    var pathname = request.url;
    var realpath = '.' + url.parse(request.url).pathname;
    fs.readFile(realpath, "binary", function (err, file) {
        response.write(file, "binary");
        response.end();
    });

});
server.listen(PORT);
console.log('node-static running at http://localhost:%d', PORT);