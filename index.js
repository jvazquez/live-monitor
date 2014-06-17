var env = process.env.NODE_ENV || 'development';
var cfg = require('./config.' + env);
var sprintf = require('sprintf').sprintf;
module.exports = cfg;
var http = require('http').Server();
var querystring = require('querystring');

if(cfg.enable_post_endpoint)
{
	http.on('request', function(request, response){
		response.writeHead(200, "OK", {'Content-Type': 'application/json'});
		response.write('{"msg": "I got your packet :D"}\n');
	    response.end();
		/*
	    if(request.method == 'POST')
	    {
	        request.on('data', function(data) {
	            queryData += data;
	            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
	            if(queryData.length > 1e6)
	            {
	                queryData = "";
	                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
	                request.connection.destroy();
	            }
	        });

	        request.on('end', function() {
	            request.post = querystring.parse(queryData);
//	            callback();
	        });

	    } else {
	        response.writeHead(405, {'Content-Type': 'text/plain'});
	        response.end();
	    }
	    */
	});
}

/**
 * Cors support is handled by this directive
 */
if(cfg.use_origins)
{
    var io = require('socket.io').listen(http, {origins: cfg.node_origins});
    console.log(sprintf('Server running with CORS support.Withelisted %s/', cfg.node_origins));
}
else
{
	var io = require('socket.io')(http);
    console.log('Server running without CORS support');
}

var redis = require('redis');
var redis_tunnel = redis.createClient();
redis_tunnel.on('error', function(err) {
	console.log('We had an error', err);
});

redis_tunnel.on('ready', function() {
	msg = sprintf("Hooked up to redis channel:%s", cfg.redis_channel);
	console.log(msg);
	redis_tunnel.subscribe(cfg.redis_channel, function(count, chan) {
		msg = sprintf("We have count:%s, channel:%s", count, chan);
		console.log(msg);
	});
});

io.on('connection', function(socket) {
	socket.on(cfg.ui_channel, function(data) {
		redis_tunnel.subscribe(cfg.redis_channel, function(count, chann) {
			console.log('Count is', count);
			console.log('Chan is ', chann);
		});
	});

	redis_tunnel.on('message', function(channel, data) {
		var message = sprintf("Sending to %s this message %s [%s]", cfg.ui_channel, data, channel);
		console.log(message);
		socket.emit(cfg.ui_channel, data);
	});
});

http.listen(cfg.port, function() {
	console.log('listening on *:' + cfg.port);
});
console.log(sprintf('Server running at %s:%s/', cfg.host, cfg.port));
