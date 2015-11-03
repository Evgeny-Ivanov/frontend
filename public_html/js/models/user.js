define([
	'backbone'
], function(
	Backbone
){

	var Model = Backbone.Model.extend({
		url: "/api/v1/auth/signup",
		defaults: {
			login: "",
			email: "",
			password: "",
			isSuccess: false,
			loginMessage: "",
			passwordMessage: "",
			emailMessage: ""
		},
		validate: function(){
			var answerEmail = this.checkEmail();
			var answerLogin = this.checkLogin();
			var answerPassword = this.checkPassword();
			if(!answerEmail || !answerLogin || !answerPassword) return "error"; 
		},
		registration: function(){
			var self = this;
			var setting = {
	                type: "POST",
	                url: self.url,
	                dataType: 'json',
	                data: self.toJSON(),
	                error : self.errorRegistration,
	                success : self.successRegistration
	            };
	        $.ajax(setting);
		},
		errorRegistration: function(xhr, status, error) {
	        alert(xhr.responseText + '|\n' + status + '|\n' +error);
	        console.log("ajax error");
	    },
        successRegistration: function(answer){ 	
            if(answer == "OK"){
                console.log("ajax success");
                this.isSuccess = true;
            }
            else{
            	this.isSuccess = false;
            }
        },
        checkEmail: function(){
        	if(this.get("email").length<4){
        		console.log("error email");
        		this.set("emailMessage","Email слишком короткий");
        		return false;
        	}
    		console.log("success email");
			this.set("emailMessage","");
			return true;
        },
        checkPassword: function(){
			if(this.get("password").length<4) {
				this.set("passwordMessage","Пароль слишком короткий");
				return false;
			}
            if(this.get("password")=="1234") {
            	this.set("passwordMessage","Пароль 1234 небезопасен");
            	return false;
			}

			this.set("passwordMessage","");
			return true;
        },
        checkLogin: function(){
            if(this.get("login").length<4) {
            	this.set("loginMessage","Логин слишком короткий");
            	return false;
			}

        	this.set("loginMessage","");
        	return true
        }

	});

	return Model;
});