define([
	"backbone",
	"views/superView",
	"tmpl/gameover",
	"models/score"
],function(
	Backbone,
	superView,
	tmpl,
	scoreModel
){

	var View = superView.extend({
		model: new scoreModel(),
		template: tmpl,
		events: {
			"submit .js-ajax-send-score": "sendScore"
		},
		sendScore: function(event){
			event.preventDefault();
			$(event.target).prop("disabled", true); //блокируем форму
			//почему то не работает 
			var name = $(".js-ajax-send-score-input").val();
			this.model.set("name",name);
			console.log(this.model);
			setTimeout(function () {
				$(event.target).prop("disabled", false);
				//alert("Все ОК ");
				//Backbone.history.navigate('#scoreboard', { trigger: true });
			}, 1000);
		},
		render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        show: function () {
            this.trigger("show");
            this.render();
            $(document.body).append(this.$el);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }
	})
	return new View;

});