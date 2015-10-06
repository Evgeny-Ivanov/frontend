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
            'click .back-in-main-menu': 'hide'
        },
        initialize: function () {
            this.$el.html(this.template());

            var self = this;             
            collectionsScores.forEach(function(num){
                var li = self.$el.find('.players').append('<li class = "players__player">'+num.get('name')+' : '+num.get('score')+'</li>');
            });
        },
        render: function () {
            // TODO
        },
        show: function () {
            this.$el.show();
        },
        hide: function () {
            this.$el.detach();
        }

    });

    return new View({model: scoremodel});
});