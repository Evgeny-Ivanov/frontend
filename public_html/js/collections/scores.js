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

    //java-сервер ajax-ом должен сюда прислать 10 лучших пользователей
    var collections = new Collection([
                    new scoreModel({
                        name: 'Женя',
                        score: -77777
                    }),
                    new scoreModel({
                        name: 'Том Круз',
                        score: -43
                    }),
                    new scoreModel({
                        name: 'Энди Дюфрейн',
                        score: 453
                    }),
                    new scoreModel({
                        name: 'Брюс Уэйн',
                        score: -43
                    }),      
                    new scoreModel()           
                ]);

    collections = collections.sortBy(function(model) {
        return -model.get('score');
    });//collections - теперь просто массив 

    collections = collections.slice(0,10);//не выдает ошибки если нет 10 элементов

    collections = new Collection(collections);

    return collections;

});