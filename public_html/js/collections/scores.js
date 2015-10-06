define([
    'backbone',
    'models/score'
], function(
    Backbone,
    scoreModel
){

    var Collection = Backbone.Collection.extend({
    	model: scoreModel,
        url: '/scoreboard'
    	//компаратор применяется что бы постоянно поддерживать коллекцию в отсортированном состоянии
    });

    //java-сервер ajax-ом должен сюда прислать 10 лучших пользователей

    var collections = new Collection([
        {name: "Тим", score: 5},
        {name: "Ида", score: 26},
        {name: "Роб", score: 55}
    ]);
    //collections.fetch({update: true, remove: false});

    //collections.fetch();

    collections = collections.sortBy(function(model) {
        return -model.get('score');
    });//collections - теперь просто массив 

    collections = collections.slice(0,10);//не выдает ошибки если нет 10 элементов

    collections = new Collection(collections);

    return collections;


});