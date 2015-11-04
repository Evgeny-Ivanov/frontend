define([
    'backbone',
    'tmpl/registration',
    'router',
    'models/user',
    'models/registration'
], function(
    Backbone,
    tmpl,
    router,
    modelUser,
    registrationModel
){

//все нужно в модель 
//исправить BEM названия сущностей
//переписать коллекцию
//
    var View = Backbone.View.extend({
        id: "registrationView",
        template: tmpl,
        model: new modelUser(),
        renderModel: new registrationModel(),
        events: {
            'submit .ajax-signin': 'authorization',
            'input .ajax-signin': 'check',
        },

        initialize: function () {
            this.render();
            $(document.body).append(this.$el);
            this.hide();
        },
        render: function () {
            this.$el.html(this.template(this.renderModel.toJSON()));
            return this;
        },
        show: function () {
            this.trigger("show");
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },
        check: function(event) {
            console.log("check");
            var type = this.$el.find(event.target).attr("type");//узнаем что за поле 
            var value = this.$el.find(event.target).val();//узнаем что мы в него записали
            console.log(value);

            this.model.set(type,value);//записываем в модель
            this.model.save();
                                    //По умолчанию метод validate вызывается только перед save, но также может быть 
                                    //вызван при выполнении set, если передать {validate:true} в хеше options.
            console.log(this.model);
            this.repaintInput(event);

            if(!this.model.isValid()){//проверяем модель на валидность
                console.log("isValid");
                return false;
            }
            console.log("return true");
            return true;
        },
        authorization: function(event){
            event.preventDefault();//отменяем стандартную отправку формы

            this.model.registration();
            if(model.get("isSuccess")){
                console.log("Регистрация успешна");
                Backbone.history.navigate('', { trigger: true });
            }
            else{
                return false;
            }

        },
        repaintInput: function(event){
            //Мезин сказал что это надо делать шаблонизатором
            console.log("repaintInput");
            var type = this.$el.find(event.target).attr("type");
            console.log(type);
            var message = this.model.get(type+"Message");//получаем ошибку из модели
                                                         //если ошибки нет вернется пустая строка
            console.log("message: "+message)
            event.target.setCustomValidity(message);//если передать сюда пустую строку
                                                    //браузер воспримет что ошибки нет
            //устанавливаем тут ошибку - в main.css - псевдокласс который поменяет стили
        }

    });

    return new View();
});