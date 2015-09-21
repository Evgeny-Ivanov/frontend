define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        id:'mainView',
        template: tmpl,
        events: {
            'click': 'hide'
        },
        initialize: function () {
            this.$el.html(this.template());
        },
        render: function () {
        },
        show: function () {
            $(this.el).show();
        },
        hide: function () {
            //this.remove();
            this.$el.hide();
        }


    });

    return new View();
});