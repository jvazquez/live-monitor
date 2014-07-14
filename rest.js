var http = require('http'),
  sprintf = require('sprintf').sprintf,
  path = require('path'),
  url = require('url'),
  querystring = require('querystring'),
  fs = require('fs');

exports.rest_endpoint = function(configuration){
 var server = http.createServer().listen(configuration.port_rest, configuration.host);
 server.on('request', function(request, response){
 	var pathname = url.parse(request.url).pathname;
  var method = request.method;
  var message = sprintf("Got a request for %s with method %s", pathname, method);
  console.log(message);
  if(method=='GET' && pathname=='/channel/')
  {
    var custom = [];
    configuration.redis_channels.forEach(function(channel, index){
      custom.push({'id': index, 'name': channel});
    });
    var the_channels = JSON.stringify(custom);
    response.writeHead(200, {'Content-Length': the_channels.length, 'Content-Type': 'application/json'});
    response.write(the_channels);
    response.end();
  }
  else
  {
    response.writeHead(404, {'Content-Length': 0, 'Content-Type': 'text/plain'});
    response.write('');
    response.end();
  }
 });
 console.log(sprintf('Rest server running at %s:%s/', configuration.host, configuration.port_rest));
};
