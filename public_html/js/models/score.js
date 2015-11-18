define([
    'backbone',
    'helpers/sync'
], function(
    Backbone,
    customSync
){

    var Model = Backbone.Model.extend({
        sync: customSync,
    	initialize: function(){
    	},
        url: '/scoreboard',
        idAttribute: 'id_event',
    	defaults: {
    		name: 'An unnamed cell',
    		score: 0
    	},
        fetch: function(options) {
            options = options ? _.clone(options) : {};//если не передали параметры присваиваем пустому объкту
            if (options.parse === void 0) options.parse = true;
            var model = this;
            options.success = function(resp) {
                if (!model.set(model.parse(resp, options), options)) return false;
                //model.parse должна возвратить хэш атрибутов, который будет передан методу set.
                //Реализация по умолчанию просто пробрасывает JSON-ответ
                if (success) success(model, resp, options);
                model.trigger('sync', model, resp, options);
            };
            return this.sync('read', this, options);
        }

    });

    return Model;
});