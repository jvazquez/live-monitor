define(['backbone', 'client_configuration', 'sprintf'], function(Backbone, client_configuration, sprintf){
  var ChannelModel = Backbone.Model.extend({
    defaults:{name: null, id: null},
    url: sprintf.sprintf("%s%s/", client_configuration.site.node_endpoint, 'channel'),
    initialize:function(){
     var msg = sprintf.sprintf("My url is %s", this.url);
     console.log(msg); 
    }
	});
	return ChannelModel;
});
