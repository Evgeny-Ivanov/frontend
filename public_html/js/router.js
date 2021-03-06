define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/scoreboard',
    'views/registration',
    'views/viewManager',
    'views/gameover',
    'views/loading',
    'views/errorScoreboard'

], function(
    Backbone,
    mainView,
    gameView,
    loginView,
    scoreboardView,
    registrationView,
    viewManager,
    gameOverView,
    loadingView,
    errorScoreboardView
){

	// в canvas requestAnimationFrame нужно вызывать не для каждого шарика а для всего массива 
	// почему ?
	
    viewManager.addArray([
        mainView,
        gameView,
        loginView,
        scoreboardView,
        registrationView,
        gameOverView,
        loadingView,
        errorScoreboardView
    ]);

    //ДЗ - написать свой Backbone.sync по RESTful
    //с помощью ajax 


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
