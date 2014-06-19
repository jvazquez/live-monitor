define([ 'backbone' ], function(Backbone) {
	var LiveFeedModel = Backbone.Model.extend({
		defaults : {
			rawMessage: {"status": "Not listening..."}
		}
	});
	return LiveFeedModel;
});