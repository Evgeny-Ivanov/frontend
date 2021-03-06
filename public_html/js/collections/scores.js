define([
    'backbone',
    'models/score',
    'helpers/storage',
    'helpers/sync'
], function(
    Backbone,
    scoreModel,
    storage,
    sync
){

    var Collection = Backbone.Collection.extend({
    	model: scoreModel,
        sync: sync,
        url: '/api/v1/scores',
        comparator: function(model) {
            return -model.get('score');
        },
        fetch: function(limit){
            //GET /scores
            var method = "read";
            if(!limit) limit = "";
            var data = {limit: limit};

            var self = this;
            //получаем коллекцию моделей с сервера
            var options = {
                url: this.url,
                data: JSON.stringify(data),
                success: function(data,textStatus,xhr){
                    var status = xhr.status;
                    console.log("success fetch collection score");
                    if(status == 200){
                        _.each(data,function(model){
                            self.add(model);
                        });
                    };
                    self.trigger('sync');
                },
                error: function(xhr,textStatus,errorMessage) {
                    var status = xhr.status;
                    console.log("error send scores: ",method,options);
                    storage.put(method,options);
                    self.trigger('error'); 
                }
            }
            return this.sync(method, this, options);
        },
        create: function(options){
            //Удобное создание модели внутри коллекции. 
        }
    });

    var collections = new Collection();

    return collections;


});
