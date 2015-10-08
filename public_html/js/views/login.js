define([
    'backbone',
    'tmpl/login',
    'router'
], function(
    Backbone,
    tmpl,
    router
){

    var View = Backbone.View.extend({
        el: $("#page"),
        template: tmpl,
        events: {
            'click .back-in-main-menu': 'hide',
            'submit .ajax-signin': 'ajaxAuthorization',
            'input .ajax-signin__input-email': 'isValidityEmail',
            'input .ajax-signin__input-password': 'isValidityPassword'
        },

        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        show: function () {
            this.render();
            this.$el.show();
        },
        hide: function () {
            console.log("hide login");
        },
        ajaxAuthorization: function(){

            var setting = {
                type: "POST",
                url: "/api/v1/auth/signin",
                dataType: 'json',
                error : function(xhr, status, error) {
                           alert(xhr.responseText + '|\n' + status + '|\n' +error);
                           console.log("ajax error");
                        },
                success : function(answer){
                            if(answer == "OK"){
                                console.log("ajax success");
                                Backbone.history.navigate('', { trigger: true });
                            }
                            else{
                                var $error = $(".form-horizontal__error-panel"); 
                                $error.append(answer);
                                $error.show();
                            }

                          }
            };
            var password = $("#inputPassword3").val();
            var email = $('#inputEmail3').val();
            console.log('email = '+email);
            setting.data = {"email": email,"password":password};
            $.ajax(setting);
        },
        isValidityEmail: function(event){
            var valEmail = this.$el.find('.ajax-signin #inputEmail3').val();
            if (event.target.validity.valid) {
                this.$el.find('.ajax-signin__status-logo-email').removeClass('glyphicon-remove').addClass('glyphicon-ok').show();
                this.$el.find('.ajax-signin__input-email').removeClass('has-error').addClass('has-success');
            } else {
                this.$el.find('.ajax-signin__status-logo-email').removeClass('glyphicon-ok').addClass('glyphicon-remove').show();
                this.$el.find('.ajax-signin__input-email').removeClass('has-success').addClass('has-error');
            }

        },

        isValidityPassword: function(event){
            var valPassword = this.$el.find('.ajax-signin #inputPassword3').val();

            if(valPassword.length<4) event.target.setCustomValidity("Пароль слишком короткий");   
            else event.target.setCustomValidity("");

            if (event.target.validity.valid) {
                this.$el.find('.ajax-signin__status-logo-password').removeClass('glyphicon-remove').addClass('glyphicon-ok').show();
                this.$el.find('.ajax-signin__input-password').removeClass('has-error').addClass('has-success');
            } else {
                this.$el.find('.ajax-signin__status-logo-password').removeClass('glyphicon-ok').addClass('glyphicon-remove').show();
                this.$el.find('.ajax-signin__input-password').removeClass('has-success').addClass('has-error');
            }

        }


    });

    return new View();
});