define([ 'jQuery', 'backbone', 'socket', 'json_human',
		'text!templates/live_feeds/index.html' ], function($, Backbone,
		JsonHuman, indexTemplate) {
	var IndexHome = Backbone.View.extend({
		// el : $("#main-canvas"),
		events : {
			'click #perseus-feed' : 'listen_perseus_feeds'
		},
		delegateEvents : function(events) {
			this.cid = 'live-feeds-view';
			Backbone.View.prototype.delegateEvents.call(this, events);
		},
		initialize : function() {
			compiled_template = _.template(indexTemplate);
			this.render(compiled_template);
		},
		render : function(compiled_template) {
			this.$el.html(compiled_template);
		}
	});
	return IndexHome;
});