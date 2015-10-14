define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/scoreboard',
    'views/registration'

], function(
    Backbone,
    mainView,
    gameView,
    loginView,
    scoreboardView,
    registrationView
){



    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'registration': 'registrationAction',
            'login': 'loginAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            mainView.show();
        },
        scoreboardAction: function () {
            scoreboardView.show();
        },
        gameAction: function () {
            gameView.show();
        },
        loginAction: function () {
            loginView.show();
        },
        registrationAction: function () {
            registrationView.show();
        }
    });

    return new Router();
});
