define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        id: "mainView",
        template: tmpl,
        events: {
        },
        initialize: function () {
            this.render();
            $(document.body).append(this.$el);
            this.hide();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        show: function () {
            this.trigger('show'); 
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
            //наверно надо тут удалять обработчики
            //при инициализации приложения все обработчики из всех вьюшек начинают работать 
        }


    });

    return new View();
});