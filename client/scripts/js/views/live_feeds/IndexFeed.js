define([ 'jQuery', 'backbone', 'json_human', 'models/live_feeds/LiveFeedModel',
		'text!templates/live_feeds/index.html' ], function($, Backbone,
		JsonHuman, LiveFeedModel, indexTemplate) {
	var IndexFeed = Backbone.View.extend({
		// el : $("#main-canvas"),
		delegateEvents : function(events) {
			this.cid = 'live-feeds-view';
			Backbone.View.prototype.delegateEvents.call(this, events);
		},
		initialize : function(opts) {
			this.model = opts.model || new LiveFeedModel();
			this.model.on('change', this.redraw, this);
			this.redraw();
		},
		redraw: function(){
			console.log('The model has', this.model.toJSON().rawMessage);
			compiled_template = _.template(indexTemplate,
					{
						feed_data : JsonHuman.format(this.model.toJSON().rawMessage).innerHTML
					});
			this.render(compiled_template);
		},
		render : function(compiled_template) {
			if(this.$el.children().length==0){
				this.$el.html(compiled_template);
			}else{
				this.$el.append(compiled_template);
			}
		}
	});
	return IndexFeed;
});