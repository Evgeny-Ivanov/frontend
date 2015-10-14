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
        el: $("#page"),
        collection: collectionsScores,
        template: tmpl,
        events: {
            'click .back-in-main-menu': 'hide'
        },
        initialize: function () {
        },
        render: function () {           
            this.$el.html(this.template(this.collection.toJSON()));
        },
        show: function () {
            this.render();
            this.$el.show();
        },
        hide: function () {
        }

    });

    return new View({model: scoremodel});
});