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
        id: "CollectionView",
        collection: collectionsScores,
        template: tmpl,
        events: {
            'click .back-in-main-menu': 'hide'
        },
        initialize: function () {
            this.render();
            $(document.body).append(this.$el);
            this.hide();
        },
        render: function () {           
            this.$el.html(this.template(this.collection.toJSON()));
        },
        show: function () {
            this.trigger("show");
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View({model: scoremodel});
});