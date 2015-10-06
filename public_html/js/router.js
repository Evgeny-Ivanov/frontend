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
        $el: $("#page"),//для удобства
        defaultActions: function () {
            this.$el.empty();
        	this.$el.append(mainView.el);
            mainView.show();
        },
        scoreboardAction: function () {
            this.$el.empty();
        	this.$el.append(scoreboardView.el);
            scoreboardView.show();
        },
        gameAction: function () {
            this.$el.empty();
        	this.$el.append(gameView.el);
            gameView.show();
        },
        loginAction: function () {
            this.$el.empty();
        	this.$el.append(loginView.el);
            loginView.show();
        },
        registrationAction: function () {
            this.$el.empty();
            this.$el.append(registrationView.el);
            loginView.show();
        }
    });

    return new Router();
});
