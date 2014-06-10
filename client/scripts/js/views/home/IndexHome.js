define([ 'jQuery', 'backbone', 'socket', 'json_human',
		'text!templates/home/index.html' ], function($, Backbone, socket,
		JsonHuman, indexTemplate) {
	var IndexHome = Backbone.View.extend({
		// el : $("#main-canvas"),
		events : {
			'click #perseus-feed' : 'listen_perseus_feeds'
		},
		delegateEvents : function(events) {
			this.cid = 'homepage-view';
			Backbone.View.prototype.delegateEvents.call(this, events);
		},
		initialize : function(opts) {
			compiled_template = _.template(indexTemplate);
			this.container = opts.container||{};
			this.render(compiled_template);
		},
		render : function(compiled_template) {
			this.$el.html(compiled_template);
		},
		listen_perseus_feeds : function() {
			io = socket.connect("http://live-monitor.pollux.box");
			if (io) {
				console.log('now we are listening');
				io.on('ui_log_feed', function(data) {
//					console.log('We have data', data);
//					$('#notification-section').append(
//							'<tr><td colspan="2" align="center">'
//									+ JsonHuman.format(data).innerHTML
//									+ '</td></tr>');
				});
			} else {
				console.log('Socket not ready, sorry');
			}
		}
	});
	return IndexHome;
});