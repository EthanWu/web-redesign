
var PORT = 8000;
var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function (request, response) {
    var pathname =request.url;
    var realpath = '.' + url.parse(request.url).pathname;
    path.exists(realpath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + realpath + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realpath, "binary", function (err, file) {
                if (err) {
                    response.end(err);
                } else {
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log('node-static running at http://localhost:%d', PORT);