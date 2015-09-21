define([
    'backbone'
], function(
    Backbone
){

    var Model = Backbone.Model.extend({
    	initialize: function(){
    	},
    	defaults: {
    		name: 'An unnamed cell',
    		score: 0
    	}

    });

    return Model;
});