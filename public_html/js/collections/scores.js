define([
    'backbone',
    'models/score'
], function(
    Backbone,
    scoreModel
){

    var Collection = Backbone.Collection.extend({
    	model: scoreModel,
        url: '/api/v1/scores',
        limit: 10,
        comparator: function(model) {
            return -model.get('score');
        },
        fetch: function(options){
            //получаем коллекцию моделей с сервера
        var self = this;
        
        options.success = function(resp) {

            var method = options.reset ? 'reset' : 'set';
            self[method](resp, options);


            _.each(resp,function(model){

                var model = new scoreModel(model);

                self.set(model);
                self.set({name:"asdas",score:"10"});

                console.log(self);
            });

            self.trigger('sync', self, resp, options);
        };

        options.error = function(resp) {
            self.trigger('error', self, resp, options);
        };

        return this.sync('read', this, options);

        },
        create: function(options){
            //Удобное создание модели внутри коллекции. 
        }
    });

    var collections = new Collection();

    var options = {
        reset: "set",
    }
    collections.fetch(options);

    return collections;


});
