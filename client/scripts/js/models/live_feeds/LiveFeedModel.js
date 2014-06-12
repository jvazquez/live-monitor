define([ 'backbone' ], function(Backbone) {
	var LiveFeedModel = Backbone.Model.extend({
		defaults : {
			rawMessage: {"msg": "Waiting for feed"}
		}
	});
	return LiveFeedModel;
});