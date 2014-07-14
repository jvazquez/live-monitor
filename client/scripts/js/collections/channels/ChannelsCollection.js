define(['backbone', 'client_configuration', 'sprintf',
  'models/channels/ChannelModel'
], function(Backbone, client_configuration, sprintf, ChannelModel){
  var ChannelsCollection = Backbone.Collection.extend({
      model: ChannelModel,
      initialize : function(models, options) {},
      url : sprintf.sprintf("%s%s/", client_configuration.site.node_endpoint, 'channel'),
  });

  return ChannelsCollection;
});
