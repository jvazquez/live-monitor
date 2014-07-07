define([ 'backbone' ], function(Backbone) {
	var ChannelModel = Backbone.Model.extend({
		defaults:{
			name: null
		}
	});
	return ChannelModel;
});
