define([ 'jQuery', 'backbone', ], function($, Backbone) {
	var ViewCollection = Backbone.View.extend({
		initialize : function(opts) {
			this.my_view_collection = {};
			this.my_view_name_index = [];
		},
		showView : function(view) {
			if (this.currentView) {
				console.log('Current view triggered close');
			}
			this.currentView = view;
			this.$el.html(this.currentView.render());
		},
		pushViewInto : function(view, target) {
			// User should check
			this.my_view_name_index.push(view.cid);
			output = view.render()
			target.append(output);
		},
		popView : function(view) {
			name = view.cid;
			view = this.my_view_collection[name];
			view.close();
			name_index = $.inArray(name, this.my_view_name_index)
			delete this.my_view_name_index[name_index];
			delete this.my_view_collection[name];
		},
		stackViewAppend : function(sender, view) {
			is_on_stack = $.inArray(view.cid, this.my_view_name_index);
			if (is_on_stack == -1) {
				this.my_view_name_index.push(view.cid);
				this.my_view_collection[view.cid] = view;
				this.$el.html(view.render());
			} else {
				this.renderAstackView(view.cid);
			}
		},
		renderAstackView : function(viewcid) {
			the_view = this.my_view_collection[viewcid];
			the_view.render();
		},
		has : function(viewCid) {
			return $.inArray(viewCid, this.my_view_name_index) != -1 ? true
					: false;
		},
		retrieveView : function(viewcid) {
			return this.my_view_collection[viewcid];
		},
		reintegrate : function(view) {
			old = this.my_view_collection[view.cid];
			old.close();
			this.my_view_collection[view.cid] = view;
		}
	});
	return ViewCollection;
});