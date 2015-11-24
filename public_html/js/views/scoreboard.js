define([
    'backbone',
    'tmpl/scoreboard',
    'models/score',
    'collections/scores',
    'views/superView',
    'helpers/storage'
], function(
    Backbone,
    tmpl,
    scoreModel,
    scores,
    superView,
    storage
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

            this.trigger("show");
            this.showLoading();

            this.collection.fetch(5);
        },
        showSuccess: function(){
            this.trigger("show");
            console.log("fsdasd");
            this.render();
            this.$el.show();
        },
        showError: function(){
            //нужно запилить и тут отобразить вьюшку ошибки
        },
        showLoading: function(){
            //нужно запилить и тут отобразить вьюшку загрузки
        },
        hide: function(){
            this.$el.hide();
        }
    });

    return new View();
});