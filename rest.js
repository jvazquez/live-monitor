var env = process.env.NODE_ENV||'development';
var cfg = require('./config.' + env);
module.exports = cfg;
var http = require('http').Server();
var sprintf = require('sprintf').sprintf;
var redis = require('redis');
var redis_tunnel = redis.createClient();


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


redis_tunnel.on('error', function(err) {
	console.log('We had an error', err);
});

redis_tunnel.on('ready', function(){
  cfg.redis_channels.forEach(function(channel, index){
    redis_tunnel.subscribe(channel, function(count, chan){
      var message = sprintf("Now listening on %s", chan);
      console.log(message);
	  });
  });
});

io.on('connection', function(socket) {
	socket.on(cfg.ui_channel, function(data) {
		redis_tunnel.subscribe(cfg.redis_channel, function(count, chann) {
			console.log('Chan is ', chann);
		});
	});
	redis_tunnel.on('message', function(channel, data) {
		var message = sprintf("Sending to %s this message %s [%s]", cfg.ui_channel, data, channel);
		socket.emit(cfg.ui_channel, data);
	});
});

server.listen(cfg.port, function(){console.log('listening on *:' + cfg.port);});
console.log(sprintf('Server running at %s:%s/', cfg.host, cfg.port));
