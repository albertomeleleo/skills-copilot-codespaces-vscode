// Create web server 

// Load the http module to create an http server.
var http = require('http');

// Load the fs module to read the file system
var fs = require('fs');

// Load the url module to parse the request url
var url = require('url');

// Load the querystring module to parse the query string
var querystring = require('querystring');

// Load the comments module to handle comments
var comments = require('./comments');

// Configure the server to respond to all requests with a simple html page
var server = http.createServer(function (request, response) {

    var path = url.parse(request.url).pathname;
    var query = querystring.parse(url.parse(request.url).query);

    switch (path) {
        case '/':
            fs.readFile(__dirname + '/index.html', function (err, data) {
                if (err) return send404(response);
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data, 'utf8');
                response.end();
            });
            break;
        case '/comments':
            if (query['comment'] != undefined) {
                comments.add(query['comment']);
            }
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(comments.list()));
            response.end();
            break;
        default: send404(response);
    }
});

// Send a 404 Not Found response
function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('404 Not Found');
    response.end();
}

// Listen on port 8000, IP defaults to
