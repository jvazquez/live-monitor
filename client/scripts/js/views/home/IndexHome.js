define([ 'jQuery', 'backbone', 'socket', 'views/live_feeds/IndexFeed',
		'models/live_feeds/LiveFeedModel', 'text!templates/home/index.html' ],
		function($, Backbone, socket, indexFeed, liveFeedModel, indexTemplate) {
			var IndexHome = Backbone.View.extend({
				// el : $("#main-canvas"),
				events : {
					'click #perseus-feed' : 'listen_perseus_feeds',
				},
				delegateEvents : function(events) {
					this.cid = 'homepage-view';
					Backbone.View.prototype.delegateEvents.call(this, events);
				},
				initialize : function(opts) {
					compiled_template = _.template(indexTemplate);
					this.container = opts.container || {};
					this.render(compiled_template);
				},
				render : function(compiled_template) {
					this.$el.html(compiled_template);
				},
				
				listen_perseus_feeds : function() {
					io = socket.connect("http://live-monitor.aldebaran");
					if (io) {
						liveFeedModel = new liveFeedModel();
						indexFeed = new indexFeed({el:$("#notification-section"),
								container: this.container, model: liveFeedModel});
						io.on('ui_live_feed', function(data) {
							liveFeedModel.set('rawMessage', JSON.parse(data));
							// console.log('We have data', data);
//							 $('#notification-section').append(
//							 '<tr><td colspan="2" align="center">'
//							 + JsonHuman.format(data).innerHTML
//							 + '</td></tr>');
						});
					} else {
						console.log('Socket not ready, sorry');
					}
				}
			});
			return IndexHome;
		});
