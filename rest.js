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
  console.log(sprintf("Pathname:%s , method:%s", pathname, method));
  if(method=='GET' && pathname=='/channel/')
  {
    response.writeHead(200, {'Content-Length': 'ok'.length, 'Content-Type': 'text/plain'});
    response.write('ok\n');
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
