define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/scoreboard'

], function(
    Backbone,
    mainView,
    gameView,
    loginView,
    scoreboardView
){



    var Router = Backbone.Router.extend({

        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultActions'
        },

        defaultActions: function () {
        	$("#page").append(mainView.el);
            mainView.show();
        },
        scoreboardAction: function () {
            alert("Scoreboard");
        	$("#page").append(scoreboardView.el);
            scoreboardView.show();
        },
        gameAction: function () {
        	$("#page").append(gameView.el);
            gameView.show();
        },
        loginAction: function () {
        	$("#page").append(loginView.el);
            loginView.show();
        }
    });

    return new Router();
});
