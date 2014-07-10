define(['jQuery', 'backbone', 'socket', 'client_configuration',
    'views/live_feeds/IndexFeed', 'models/live_feeds/LiveFeedModel',
    'models/channels/ChannelModel', 'text!templates/home/index.html' ],
		function($, Backbone, socket, client_configuration, indexFeed,
      liveFeedModel, channelModel, indexTemplate) {
			var IndexHome = Backbone.View.extend({
				// el : $("#main-canvas"),
				events : {
					'click #perseus-feed' : 'listen_perseus_feeds',
					'click #clean-feed': 'clean_feed_table',
          'click #get-channels': 'get_channel_list'
				},

				delegateEvents : function(events) {
					this.cid = 'homepage-view';
					Backbone.View.prototype.delegateEvents.call(this, events);
				},

				initialize : function(opts){
					compiled_template = _.template(indexTemplate);
					this.container = opts.container || {};
					this.render(compiled_template);
					this.liveFeedModel = new liveFeedModel();
					this.indexFeed = new indexFeed({el:$("#notification-section"),
					  container: this.container, model: this.liveFeedModel});
					this.io = socket.connect(client_configuration.site.node_endpoint);
				},
				render : function(compiled_template) {
					this.$el.html(compiled_template);
				},
				clean_feed_table:function(){
					$('#notification-section').empty();
					this.liveFeedModel.set('rawMessage', {"msg": "Awaiting new data.."});
				},
				listen_perseus_feeds: function(){
					if (this.io) {
						self = this;
            this.liveFeedModel.set('rawMessage', {"msg": "Listening perseus..."});
						this.io.on('ui_live_feed', function(data) {
							self.liveFeedModel.set('rawMessage', JSON.parse(data));
						});
					}else{
						console.log('Socket not ready, sorry');
					}
				},
        get_channel_list:function(){
          var channels = new channelModel();
          channels.fetch();
        }
			});
			return IndexHome;
});
