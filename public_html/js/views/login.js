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
        className: 'loginView',
        template: tmpl,
        events: {
            'click .back-in-main-menu': 'hide',
            'submit .ajax-signin': 'ajaxAuthorization',
            'input .ajax-signin__input-email': 'isValidityEmail'
        },

        initialize: function () {
            this.$el.html(this.template());
        },
        render: function () {
        },
        show: function () {
            this.$el.show();
        },
        hide: function () {
            this.$el.detach();
        },
        ajaxAuthorization: function(){

            setting = {
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
            console.dir(valEmail);
            if (event.target.validity.valid) {
                this.$el.find('.ajax-signin__success-logo').removeClass('glyphicon-remove').addClass('glyphicon-ok').show();
                this.$el.find('.ajax-signin__input-email').removeClass('has-error').addClass('has-success');
            } else {
                this.$el.find('.ajax-signin__success-logo').removeClass('glyphicon-ok').addClass('glyphicon-remove').show();
                this.$el.find('.ajax-signin__input-email').removeClass('has-success').addClass('has-error');
            }

        }});

    return new View();
});