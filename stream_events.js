var env = process.env.NODE_ENV||'development';
var http = require('http').Server();
var sprintf = require('sprintf').sprintf;
var redis = require('redis');
var redis_tunnel = redis.createClient();

redis_tunnel.on('error', function(err) {
  var message = sprintf("We had an error on redis tunnel:%s", err);
	console.log(message);
});

exports.stream_redis = function (configuration){

  if(configuration.use_origins)
  {
      var io = require('socket.io').listen(http, {origins: configuration.node_origins});
      console.log(sprintf('Server running with CORS support.Withelisted %s/', configuration.node_origins));
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
    configuration.redis_channels.forEach(function(channel, index){
      redis_tunnel.subscribe(channel, function(count, chan){
        var message = sprintf("Now listening on %s", chan);
        console.log(message);
      });
    });
  });

  io.on('connection', function(socket) {
    socket.on(configuration.ui_channel, function(data) {
      redis_tunnel.subscribe(configuration.redis_channel, function(count, chann) {
        console.log('Chan is ', chann);
      });
    });
    redis_tunnel.on('message', function(channel, data) {
      //TODO Configure this and provide better configuration
      var composed_channel_name = sprintf("ui_live_feed_%s", channel);
      var message = sprintf("Sending to %s this message %s [%s]", composed_channel_name, data, channel);
      console.log(message);
      socket.emit(composed_channel_name, data);
    });
  });

  http.listen(configuration.port, configuration.host);
  console.log(sprintf('Socket.io running at %s:%s/', configuration.host, configuration.port));
};
