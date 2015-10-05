define([
    'backbone'
], function(
    Backbone
){

    var Model = Backbone.Model.extend({
    	initialize: function(){
    	},
        url: '/scoreboard',
        idAttribute: 'id_event',
    	defaults: {
    		name: 'An unnamed cell',
    		score: 0
    	}


    });

    return Model;
});