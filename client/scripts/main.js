require.config({
	baseUrl : "scripts/js",
	paths : {
		"bootstrap" : "bower_components/bootstrap/dist/js/bootstrap",
		"jQuery" : "bower_components/jquery/dist/jquery.min",
		"backbone" : "bower_components/backbone/backbone",
		"underscore" : "bower_components/underscore/underscore",
		"jQueryUi" : "bower_components/jqueryui/ui/minified/jquery-ui.min",
		"socket": "http://live-monitor.pollux.box/socket.io/socket.io"
	},
	shim : {
		bootstrap : {
			deps : [ "jQuery" ],
			exports : 'Bootstrap'
		},
		jQuery : {
			exports : '$'
		},
		jQueryUi : {
			deps : [ "jQuery" ]
		},
		backbone : {
			deps : [ "underscore" ]
		},
		underscore : {
			exports : '_'
		},
		socketio:{
            exports: 'io'
        }
	}
});
requirejs([ 'jQuery', 'bootstrap', 'backbone', 'jQueryUi', 'socket'],
	function($, bootstrap, backbone, jqueryUi, socket) {
	var io = socket.connect("http://live-monitor.pollux.box");
	if(io){
		io.on('ui_log_feed', function(data){
			console.log('Stuff is here', data);
		});
	}else{
		console.log('Socket not ready, sorry');
	}
});