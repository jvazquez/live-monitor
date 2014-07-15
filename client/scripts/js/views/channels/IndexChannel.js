define(['jQuery', 'backbone', 'json_human', 'socket', 'client_configuration',
'collections/channels/ChannelsCollection','text!templates/channels/index.html'],
function($, Backbone, JsonHuman,socket, client_configuration,
      ChannelsCollection, indexTemplate){

	var IndexChannel = Backbone.View.extend({

		delegateEvents : function(events) {
			this.cid = 'channels-view';
			Backbone.View.prototype.delegateEvents.call(this, events);
		},

		initialize:function(opts){
      if(opts.collection)
      {
			  this.collection = opts.collection;
        this.collection.on('change', this.redraw, this);
			  this.redraw();
      }
      else
      {
        this.collection = new ChannelsCollection();
        that = this;
        $.when(this.collection.fetch())
            .done(function(response){
              that.redraw();
              this.collection.on('change', this.redraw, this);
            })
            .fail(function(response){
              console.log("This constitutes an error", response);
            });
      }
		},
 		redraw: function(){
			compiled_template = _.template(indexTemplate,{channels: this.collection.toJSON()});
			this.render(compiled_template);
		},
		render:function(compiled_template) {
		  this.$el.html(compiled_template);
		}
	});

	return IndexChannel;
});
