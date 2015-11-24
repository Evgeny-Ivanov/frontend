define([
	'helpers/sync'
],function(
	sync
){
	var storage = {
		prefix: 'queue-',
		count: function(){
			var countItem = localStorage.getItem("count");
			if(!countItem) return 0;
			return countItem;
		},
		put: function(method,options,key){//sync = function(method,model,options){
			var item = {
				method: method,
				options: options
			}

			item = JSON.stringify(item);
			if(!key){
				var count = this.count();
				localStorage.setItem(this.prefix + count,item);
				count++;
				localStorage.setItem("count",count);
			}
			else{
				localStorage.setItem(key,item);
			}

		},
		clearAll: function(){
			var count = this.count();
			console.log(count);
			for(i = 0;i<count;i++){
				localStorage.removeItem(this.prefix + i);
			}
			localStorage.setItem("count",0);
		},
		clear: function(name){
			localStorage.removeItem(name);
			count--;
			localStorage.setItem("count",count);
		},
		send: function(){
			var count = this.count();
			for(i = 0;i<count;i++){
				var data = localStorage.getItem(this.prefix + i);
				data = JSON.parse(data);
				var method = data.method;
				var options = data.options;

				var model = null;//костыль
				sync(method,model,options); 

				this.clear(this.prefix + i);//удаляем , затем если в верхмем методе будет ошибка модель опять запишет в localstorage
			}
		},

	};


	return storage;
});