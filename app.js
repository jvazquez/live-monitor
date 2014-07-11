var env = process.env.NODE_ENV||'development';
var cfg = require('./config.' + env);
module.exports = cfg;

if(cfg.use_socketio)
{}

if(cfg.use_http)
{}
