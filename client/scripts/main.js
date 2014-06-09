require.config({
	baseUrl : "scripts/js",
	paths : {
		"bootstrap" : "bower_components/bootstrap/dist/js/bootstrap",
		"jQuery" : "bower_components/jquery/dist/jquery.min",
		"backbone" : "bower_components/backbone/backbone",
		"underscore" : "bower_components/underscore/underscore",
		"jQueryUi" : "bower_components/jqueryui/ui/minified/jquery-ui.min",
		"socket": "http://live-monitor.pollux.box/socket.io/socket.io",
		"json_human": "bower_components/json-human/src/json.human",
		"crel":"bower_components/json-human/lib/crel"
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
        },
        crel:{
        	exports: 'crel'
        },
        json_human:{
        	deps:['crel'],
        	exports: 'JsonHuman'
        }
	}
});
requirejs([ 'jQuery', 'bootstrap', 'backbone', 'jQueryUi', 'socket', 'json_human'],
	function($, bootstrap, backbone, jqueryUi, socket, JsonHuman) {
	console.log('Json human is', JsonHuman);
	var io = socket.connect("http://live-monitor.pollux.box");
	if(io){
		io.on('ui_log_feed', function(data){
			$('#notification-section').append('<tr><td colspan="2" align="center">'+JsonHuman.format(data).innerHTML+'</td></tr>');
		});
	}else{
		console.log('Socket not ready, sorry');
	}

	$('#perseus-feed').click(function(){
		$('#target-feed').append($(this).data('name'));
	});

	$('#clean-feed').click(function(){
		$('#notification-section').empty();
	});
});