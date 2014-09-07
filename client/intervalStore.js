IntervalStore = function(){
};

IntervalStore.prototype.find = function(id) {
	return $.get('localhost:8000/' + id);
};

IntervalStore.prototype.add = function(id) {
};

