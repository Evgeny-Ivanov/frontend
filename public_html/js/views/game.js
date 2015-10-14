define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        el: $("#page"),
        template: tmpl,
        events: {
            'click .back-in-main-menu': 'hide'
        },
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function () {
            this.render();
            $(this.el).show();
        },
        hide: function () {
            //что бы вызвать функцию роутера,установите свойство trigger в true.
            //Backbone.history.navigate('', { trigger: true });
        }

    });

    return new View();
});