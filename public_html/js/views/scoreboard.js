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
            this.$el.html(this.template());

            var self = this;             
            collectionsScores.forEach(function(num){
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