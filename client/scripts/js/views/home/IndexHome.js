define(['jQuery', 'backbone', 'socket', 'client_configuration',
    'views/live_feeds/IndexFeed', 'views/channels/IndexChannel',
    'models/live_feeds/LiveFeedModel',
    'models/channels/ChannelModel', 'collections/channels/ChannelsCollection',
    'text!templates/home/index.html'],
function($, Backbone, socket, client_configuration, indexFeed, IndexChannel,
liveFeedModel, channelModel, ChannelsCollection, indexTemplate){

  var IndexHome = Backbone.View.extend({
				events:{
					'click #perseus-feed' : 'listen_perseus_feeds',
					'click #clean-feed': 'clean_feed_table',
          'click #get-channels': 'get_channel_list',
          'click #follow-channel': 'listen_channel',
				},
				delegateEvents: function(events){
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
        /*
				listen_perseus_feeds: function(){
					if (this.io){
						self = this;
            this.liveFeedModel.set('rawMessage', {"msg": "Listening perseus..."});
						this.io.on('ui_live_feed', function(data) {
							self.liveFeedModel.set('rawMessage', JSON.parse(data));
						});
					}else{
						console.log('Socket not ready, sorry');
					}
				},
        */
        get_channel_list:function(){
          var channels = new channelModel();
          $.when(channels.fetch())
            .done(function(response){
              var channelView = new IndexChannel({collection: channels, el:'#channel-list'});
            })
            .fail(function(response){
              console.log("This constitutes an error", response);
            });
        },
        listen_channel:function(){
          var channel_to_follow = $('#channel-list').val();
          if(channel_to_follow)
          {
            if (this.io){
						  self = this;
              this.liveFeedModel.set('rawMessage', {"msg": "Listening perseus..."});
						  this.io.on('ui_live_feed', function(data) {
							  self.liveFeedModel.set('rawMessage', JSON.parse(data));
						  });
					  }else{
						  console.log('Socket not ready, sorry');
					  }         
          }
          else
          {
            console.log("You don't have any selected channel so I can't connect this to nothing");
            alert('Check the console and just in case, retrieve the channels first...');
          }
        }
			});
			return IndexHome;
});
