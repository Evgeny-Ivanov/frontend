define([
    'backbone',
    'tmpl/scoreboard',
    'models/score',
    'collections/scores',
    'views/superView',
    'helpers/storage',
    'views/loading',
    'views/errorScoreboard'
], function(
    Backbone,
    tmpl,
    scoreModel,
    scores,
    superView,
    storage,
    loadingView,
    errorView
){

    var View = superView.extend({
        id: "CollectionView",
        collection: scores,
        template: tmpl,
        events: {
            'click .back-in-main-menu': 'hide'
        },
        render: function () {           
            this.$el.html(this.template(this.collection.toJSON()));
        },
        show: function () {
            //почему то эта штука в initialize не работает
            this.listenTo(this.collection,"sync",this.showSuccess);
            this.listenTo(this.collection,"error",this.showError);
            if(storage.isEmpty()){
                storage.send();
            }

            this.showLoading();

            this.collection.fetch(5);
        },
        showSuccess: function(){
            var self = this;
            window.setTimeout(
                function(){
                    self.trigger("show");
                    self.render();
                    self.$el.show();
                },
                1000
            );
        },
        showError: function(){
            window.setTimeout(
                function(){
                    errorView.show();
                },
                1000
            );
        },
        showLoading: function(){
            loadingView.show();
        },
        hide: function(){
            this.$el.hide();
        }
    });

    return new View();
});