define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        el: $("#page"),
        template: tmpl,
        events: {
            'click .js-start-game': 'hide',
            'click .js-scoreboard': 'hide',
            'click .js-login': 'hide',
            'click .js-registration': 'hide'
        },
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        show: function () {
            this.render();
            this.$el.show();
        },
        hide: function () {
            //наверно надо тут удалять обработчики
            //при инициализации приложения все обработчики из всех вьюшек начинают работать 
        }


    });

    return new View();
});