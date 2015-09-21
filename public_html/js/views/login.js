define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        className: 'login',
        template: tmpl,
        initialize: function () {
            this.$el.html(this.template());
        },
        render: function () {
            // TODO
        },
        show: function () {
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});