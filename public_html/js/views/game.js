define([
    'backbone',
    'tmpl/game',
    'views/superView'
], function(
    Backbone,
    tmpl,
    superView
){

    var View = superView.extend({
        id: "gameView",
        template: tmpl,
        events: {
        }
    });

    return new View();
});