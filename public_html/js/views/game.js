define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        id:'gameView',
        template: tmpl,
        events: {
            'click .back-in-main-menu': 'hide'
        },
        initialize: function () {
            this.$el.html(this.template());
        },
        render: function () {
            // TODO
        },
        show: function () {
            $(this.el).show();
        },
        hide: function () {
            //this.el$.remove();//удаляет элемент из DOM и все связанные с ним обработчики
            //this.el$.detach();//удаляет элемент из DOM но не трогает обработчики
            this.$el.hide();
            //что бы вызвать функцию роутера,установите свойство trigger в true.
            Backbone.history.navigate('', { trigger: true });
        }

    });

    return new View();
});