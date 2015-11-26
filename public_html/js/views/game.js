define([
    'backbone',
    'tmpl/game',
    'views/superView',
    'views/gameover',
    'models/score'
], function(
    Backbone,
    tmpl,
    superView,
    gameOverView,
    scoreModel
){

    var View = superView.extend({
        id: "gameView",
        model: new scoreModel(),
        template: tmpl,
        events: {
            "click .js-gameover": "gameOver"
        },
        gameOver: function(){
            var score = Math.round(Math.random()*100);//наш гемплей
            this.model.set('score',score);
            gameOverView.show(this.model);
        }
    });

    return new View();
});