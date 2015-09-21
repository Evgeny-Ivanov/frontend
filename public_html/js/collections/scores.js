define([
    'backbone',
    'models/score'
], function(
    Backbone,
    scoreModel
){

    var Collection = Backbone.Collection.extend({
    	model: scoreModel
    	//компаратор применяется что бы постоянно поддерживать коллекцию в отсортированном состоянии
    });

    //return new Collection();//не мое
    return Collection;
});