require.config({
    baseUrl: "scripts/js",
    paths: {
        "bootstrap":"bower_components/bootstrap/dist/js/bootstrap",
        "jQuery":"bower_components/jquery/dist/jquery.min",
        "backbone": "bower_components/backbone/backbone",
        "underscore": "bower_components/underscore/underscore"
    },
    shim:{
    	bootstrap:{
    		deps:["jQuery"],
    		exports: 'Bootstrap'
    	},
    	jQuery:{
    		exports: '$'
    	},
    	backbone:{
    		deps:["underscore"]
    	},
    	underscore:{
    		exports: '_'
    	}
    }
});
requirejs(['jQuery', 'bootstrap', 'backbone'],
function($){
});