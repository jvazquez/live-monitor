var env = process.env.NODE_ENV||'development';
var cfg = require('./config.' + env);
module.exports = cfg;

if(cfg.use_socketio)
{
  var stream_events = require('./stream_events.js');
  stream_events.stream_redis(cfg);
}

if(cfg.use_http)
{
  var rest_endpoint_server = require('./rest.js');
  rest_endpoint_server.rest_endpoint(cfg);
}
