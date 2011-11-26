var Cookie = function(name, value, expdate) {
	this.cookie = {
		name: name,
		value: value,
		exp: expdate || (new Date()).setDate((new Date()).getDate() + (60*60*24*31*2))
	};
	
	document.coo
};

Cookie.prototype.destroy = function() {
	this.cookie
};