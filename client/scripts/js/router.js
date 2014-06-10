define(['jQuery', 'backbone', 'bootstrap', 'views/home/IndexHome'], function(
		jQuery, Backbone, bootstrap, IndexHome) {
	var AppRoutes = Backbone.Router.extend({
		routes : {
			'*default' : 'defaultRoute'
		}
	});

	var initialize = function(options) {
		var app_router = new AppRoutes();
		app_router.appView = options.appView || {};

		app_router.on('route:defaultRoute', function() {
//			$.when(session.fetch({
//				url : session.url + 'check/'
//			}), siteModel.fetch({
//				url : siteModel.url + site_id + '/'
//			})).done(function(hasAuth, siteModelResponse) {
//				searchSiteDelete = new SiteDelete({
//					model : siteModel,
//					container : self.appView
//				});
//				searchSiteDelete.confirm();
//			}).fail(function(hasAuth, siteModel) {
//				console.log('has auth', hasAuth);
//				console.log('model', siteModel.toJSON());
//			});
			homeView = new IndexHome({
				container : this.appView,
				el : $("#main-canvas")
			});
			this.appView.stackViewAppend(this, homeView);
//			this.appView.pushViewInto(homeView, $('')) 
		});
		Backbone.history.start();
	};
	return {
		initialize : initialize
	};
});