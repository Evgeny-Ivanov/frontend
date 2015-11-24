define([
    'backbone',
    'helpers/sync',
    'helpers/storage'
], function(
    Backbone,
    customSync,
    storage
){

    var Model = Backbone.Model.extend({
        sync: customSync,
    	initialize: function(){
    	},
        url: '/scoreboard',
        idAttribute: 'id_event',
    	defaults: {
    		name: 'An unnamed cell',
    		score: 0
    	},
        fetch: function() {
          //GET /scores/:id
            var method = "read";
            var data = {id: this.id};
            var self = this;
            var options = {
                url: this.url,
                data: JSON.stringify(data),
                success: function(data,textStatus,xhr) {
                    var status = xhr.status;
                    data = JSON.parse(data);

                    if(status == 200){
                        self.set(data);
                    };
                },
                error: function(xhr,textStatus,errorMessage) {
                    var status = xhr.status;
                    if(status == 404){

                    }
                    if(status == 400){

                    }
                }
            };

            this.sync(method, this, options);
        },
        save: function(){
            // POST /scores
            var method = "create";
            var data = this.toJSON();
            var self = this;
            var options = {
                url: this.url,
                data: data,
                success: function(data,textStatus,xhr) {
                    var status = xhr.status;
                    data = JSON.parse(data);

                    if(status == 200){
                        self.id = data.id;
                    };
                },
                error: function(xhr,textStatus,errorMessage) {
                    var status = xhr.status;
                    if(status == 400){
                        return;
                    }
                    storage.put(method,options);
                }
            };

            this.sync(method, this, options);
        },
        destroy: function(){
           // DELETE /scores/:id
            var method = "delete";
            var data = {id: this.id};
            var self = this;
            var options = {
                url: this.url,
                data: data,
                success: function(data,textStatus,xhr) {
                    var status = xhr.status;
                    data = JSON.parse(data);

                    if(status == 200){
                        
                    };
                },
                error: function(xhr,textStatus,errorMessage) {
                    var status = xhr.status;
                    if(status == 400){
                        return;
                    }
                    if(status == 404){
                        return;
                    }
                    storage.put(method,options);
                }
            };

            this.sync(method, this, options);

        },
        update: function(){//????????????????????
            //PUT /scores/:id
            var method = "update";
            var data = this.toJSON();
            var self = this;
            var options = {
                url: this.url,
                data: data,
                success: function(data,textStatus,xhr) {
                    var status = xhr.status;
                    data = JSON.parse(data);
                    if(status == 200){
                        
                    };
                },
                error: function(xhr,textStatus,errorMessage) {
                    var status = xhr.status;
                    if(status == 400){
                        return;
                    }
                    if(status == 404){
                        return;
                    }
                    storage.put(method,options);
                }
            };

            this.sync(method, this, options);

        }

    });

    var buf = new Model({
            name: "evgen",
            score: 10
        });
    storage.clearAll();
    buf.save();
    return Model;
});