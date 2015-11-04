define([
    'backbone',
    'tmpl/scoreboard',
    'models/score',
    'collections/scores',
    'views/superView'
], function(
    Backbone,
    tmpl,
    scoreModel,
    collectionsScores,
    superView
){

    var scoremodel = new scoreModel();
    var View = superView.extend({
        id: "CollectionView",
        collection: collectionsScores,
        template: tmpl,
        events: {
            'click .back-in-main-menu': 'hide'
        },
        render: function () {           
            this.$el.html(this.template(this.collection.toJSON()));
        }
    });

    return new View({model: scoremodel});
});