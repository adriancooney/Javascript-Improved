var fn = {
    typeOf: function(data, couldBe) {
        if(!data) {
            return undefined;
        } else {
                switch( typeof data) {
                    case "object":
                        if(data[0]) { return "array"; }
                        else { return "object"; }
                        break;
                   
                    default:
                        if(typeof data) return typeof data;
			else return "unknown";
                }
        }
    },
	 
    execute: function(callback) {
		this.loop = callback;
		return this;
    },

    for: function(data, time) {
        var itIs = this.typeOf(data),
		that = this;
        
        if(time) {
            var i = 0,
            interval = setInterval(function() {
                that.loop.call(that, i);
                i++;
                if(i == data) {
                    clearInterval(interval);
                    if(that.onLoopComplete) that.onLoopComplete.call();
                }
            }, time)
            return that;
        } else {
            switch( itIs ) {
                case "number":
                    for(var i=0; i<data; i++) {
                        that.loop.call(that, i);
                        if(i == data-1) {
                            if(that.onLoopComplete) that.onLoopComplete.call();
                        }
                    }
            
                    return that;
                break;
            
                case "array":
                    for(var i=0; i<data.length; i++) {
                        that.loop.call(that, i, data[i]);
                        if(i == data.length-1) {
                            if(that.onLoopComplete) that.onLoopComplete.call();
                        }
                    }
            
                    return that;
                break;
            
                case "object":
                    var i;
                    for(key in data) {
                        i++;
                        that.loop.call(that, i, key, data[key]);
                    }
                    
                    return that;
                break;
            }
        }
    },
    
    done: function(callback) {
        this.onLoopComplete = callback;
        return this;
    },

    extend: function(obj, host) {
	    if(!host) host = window;
	    
	    for(var key in obj) {
		    host[key] = obj[key];
	    }
	    
	    return host;
    },
    
    $: function() {
        return document.querySelectorAll.apply(document, arguments)
    },
    
    $$: function(id) {
        return document.getElementById.apply(document, arguments)
    }
};

fn.extend(fn);