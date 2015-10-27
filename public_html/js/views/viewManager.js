define(['backbone'],function(Backbone){

	var ViewManager = Backbone.View.extend({
		views : [],
		add : function(view){
			this.views[this.views.length] = view;
			this.listenTo(view,'show',this.hide);
		},
		hide : function(){
			for(i = 0;i<this.views.length;i++){
					this.views[i].hide();
			}
		},

		initialize : function(){

		}
	});

	return new ViewManager();
});