require.config({
	baseUrl : "scripts/js",
	paths : {
		bootstrap: "bower_components/bootstrap/dist/js/bootstrap",
		jQuery: "bower_components/jquery/dist/jquery.min",
		backbone: "bower_components/backbone/backbone",
		underscore: "bower_components/underscore/underscore",
		jQueryUi: "bower_components/jqueryui/ui/minified/jquery-ui.min",
		socket: "http://live-monitor.pollux.box/socket.io/socket.io",
		json_human: "bower_components/json-human/src/json.human",
		crel: "bower_components/json-human/lib/crel",
		text: "bower_components/requirejs-text/text",
		templates: "../templates",
   	sprintf: 'bower_components/sprintf/dist/sprintf.min',
   	client_configuration: "configuration/site"
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
		socketio : {
			exports : 'io'
		},
		crel : {
			exports : 'crel'
		},
		json_human : {
			deps : [ 'crel' ],
			exports : 'JsonHuman'
		}
	}
});
requirejs([ 'jQuery', 'bootstrap', 'backbone', 'jQueryUi', 'router',
		'ViewCollection' ], function($, bootstrap, backbone, jqueryUi, Router,
		ViewCollection) {
	Router.initialize({
		appView : new ViewCollection({
			el : $('#main-canvas')
		})
	});
	/*
	 * $('#perseus-feed').click(function(){ $('#target-feed').empty();
	 * $('#target-feed').append('Watching ' + $(this).data('name')); });
	 * 
	 * $('#clean-feed').click(function(){ $('#notification-section').empty();
	 * });
	 */
});
