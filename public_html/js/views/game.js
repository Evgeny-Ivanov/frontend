define([
    'backbone',
    'tmpl/game',
    'views/superView',
    'views/gameover'
], function(
    Backbone,
    tmpl,
    superView,
    gameOverView
){

    var View = superView.extend({
        id: "gameView",
        template: tmpl,
        events: {
            "click .js-gameover": "gameOver"
        },
        gameOver: function(){
           gameOverView.show();
        }
    });

    return new View();
});