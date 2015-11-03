define([
	'backbone'
], function(
	Backbone
){

	var Model = Backbone.Model.extend({
		defaults: {
			password: {
				input: "",
				logo: ""
			},
			login: {
				input: "",
				logo: ""
			},
			email: {
				input: "sdfsd",
				logo: ""			
			}
		},
		success: {
			input: "glyphicon-ok",
			logo: "has-success"
		},
		error: {
			input: "glyphicon-remove",
			logo: "has-error"	
		}

	});

	return Model;
});