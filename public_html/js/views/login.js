define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        className: 'loginView',
        template: tmpl,
        events: {
            'click .back-in-main-menu': 'hide',
            'click .ajax-signin': 'ajaxAuthorization'
        },

        initialize: function () {
            this.$el.html(this.template());
        },
        render: function () {
            // TODO
        },
        show: function () {
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
            Backbone.history.navigate('', { trigger: true });
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
                            console.log("ajax success");
                          }
            };
            var password = $("#inputPassword3").val();
            var email = $('#inputEmail3').val();
            console.log('email = '+email);
            setting.data = {"email": email,"password":password};
            $.ajax(setting);
        }

    });

    return new View();
});