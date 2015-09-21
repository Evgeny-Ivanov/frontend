define([
    'backbone',
    'tmpl/scoreboard',
    'models/score',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    scoreModel,
    collectionsScores
){

    var scoremodel = new scoreModel();
    var View = Backbone.View.extend({
        id:'scoreboardView',
        template: tmpl,
        events: {
            "click ":"hide",
        },
        initialize: function () {
            var collections = new collectionsScores([
                    this.model,
                    new scoreModel({
                        name: 'Женя',
                        score: -77777
                    }),
                    new scoreModel({
                        name: 'Том Круз',
                        score: -43
                    })                 
                ]);
            this.$el.html(this.template());
            var self = this;
            collections.sortBy(function(model) {
                return model.get('score');
            });
            //forEach и each
            collections.each(function(num){
                self.$el.append('<h1>'+num.get('name')+' : '+num.get('score')+'</h1/><p>');
            });
        },
        render: function () {
            // TODO
        },
        show: function () {
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View({model: scoremodel});
});