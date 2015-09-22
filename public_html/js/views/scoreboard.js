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
                self.$el.find('.players').append('<li>'+num.get('name')+' : '+num.get('score')+'</li>');
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
            Backbone.history.navigate('', { trigger: true });
        }

    });

    return new View({model: scoremodel});
});