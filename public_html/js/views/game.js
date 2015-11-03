define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        id: "gameView",
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
        },
        show: function () {
            this.trigger('show',this);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});