var env = process.env.NODE_ENV || 'development',
    cfg = require('../config.' + env),
    sprintf = require('sprintf').sprintf;
    path = require('path'),
    url = require('url'),
    querystring = require('querystring'),
    fs = require('fs');

//can set this to true to enable for all connections
exports.debug_mode = true;

Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
	  this.prototype[name] = func;
  }
  return this;
};

function PathBuilder() {

}
exports.path_builder = PathBuilder;

PathBuilder.method('process', function(request, response) {
  return function(request, response){
		var requested_endpoint = url.parse(request.url);
		var pathname =  url.parse(request.url).pathname;
    var debug_message = sprintf("Hello, you asked for %s",
      pathname);
    console.log(debug_message);

    if(pathname=='/help/')
		{
			filename = path.join(process.cwd(), requested_endpoint.pathname, "help.json");

			fs.exists(filename, function(exists){
				if(!exists)
        {
					response.writeHead(404, {"Content-Type": "text/plain"});
					response.write("404 Not Found (help message not found :O)\n");
					response.end();
					return;
				}
				
				fs.readFile(filename, function(err, file) {
					if(err) {        
						response.writeHead(500, {"Content-Type": "text/plain"});
						response.write(err + "\n");
						response.end();
						return;
					}
					
					response.writeHead(200, {"Content-Type": "application/json"});
					response.write(file);
					response.end();
				});
			});
		}
		else if(pathname=='message')
		{
			
		}
		else
		{
			response.writeHead(200, "OK", {'Content-Type': 'application/json'});
			response.write('{"msg": "I got your packet :D"}\n');
		    response.end();
		}
		response.writeHead(200, {"Content-Type": "application/json"});
		response.write("Thanks\n");
  	response.end();
  };
}());
exports.process = PathBuilder.process;

exports.createPathBuilder = function () {
  path_builder = new PathBuilder();
  return path_builder;
};

exports.print = function (err, reply) {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Reply: " + reply);
    }
};
