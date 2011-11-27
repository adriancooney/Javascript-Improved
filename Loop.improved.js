//Some polyfills, for older browsers, that is, if you're using this in a browser
//Thanks MDN, https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray, https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
Array.isArray = Array.isArray || function (arg) {  
    return Object.prototype.toString.call(arg) == '[object Array]';  
};

Object.keys = Object.keys || function(o){  
    if (o !== Object(o)) throw new TypeError('Object.keys called on non-object');  
    var ret = [], p;  
    for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);  
    return ret;  
};

//Now the loops
var fn = {
    execute: function(callback) {
        //Set the callback and onto the this.for where the real magic happens
        this.callback = callback;

        return this;
    },

    for: function(data, time) {

        var that = this,
        //The type, a fix for array because javascript.
        type = (Array.isArray(data)) ? "array" : typeof data;
        
        function doComplete() {
            //Call the oncomplete
            that.onLoopComplete.call();
            
            //Remove the variables
            that.onLoopStart = null;
            that.onLoopComplete = null;
        }

        //The timed loop
        if (time) {
            //Call the onStart
            if (that.onLoopStart) that.onLoopStart.call();

            //Set the counter
            var i = 0,
            key,
            value,
            
            //If its an object, its length
            len = (typeof data == "object") ? Object.keys(data).length : null,
            
            //Create the loop
            interval = setInterval(function() {

                if(Array.isArray(data)) {
                    key = data[i]
                } else if (typeof data == "object") {
                    //Mini loop, probably inefficient
                    var n = 0;
                    for(var k in data) {
                        if(n == i) {
                            key = k;
                            value = data[k];
                        }
                        n++;
                    }
                }

                //Do the callback
                that.callback.call(that, i, key || null, value || null);
                
                //Increment the counter
                i++;

                //Stop the counter, data is the count because it's not only a number
                if (i == (data.length || len || data)) {
                    clearInterval(interval);
                    if (that.onLoopComplete) doComplete();
                }

            },
            time);

        } else {

            switch (type) {
                //Basic array, iterate for n times
            case "number":

                //Call the onStart
                if (that.onLoopStart) that.onLoopStart.call();

                for (var i = 0; i < data; i++) {

                    //Call the callback
                    that.callback.call(that, i);

                    //Stop the loop, decremented the data due to starting at 0
                    if (i == data - 1) {
                        if (that.onLoopComplete) doComplete();
                    }

                };

                break;

                //Iterate through an array calling the function with the value and count
            case "array":

                //Call the onStart
                if (that.onLoopStart) that.onLoopStart.call();

                //Thank you Daniel15 for the 'cache' method! Yeah, the cache. Cache.
                for (var i = 0, cache = data.length; i < cache; i++) {

                    //Call the callback with the data
                    that.callback.call(that, i, data[i]);

                    //Stop the loop, decremented the data due to starting at 0
                    if (i == cache - 1) {
                        if (that.onLoopComplete) doComplete();
                    }

                };

                break;

            case "object":

                //Call the onStart
                if (that.onLoopStart) that.onLoopStart.call();
    
                //Counter
                var i = 0, len = Object.keys(data).length;

                //Slightly different loop for a slightly different type
                for (var key in data) {
                    //Increment the counter
                    i++;

                    //Call the callback, count, key, data
                    that.callback.call(that, i, key, data[key]);
                    
                    if (i == len - 1) {
                        if (that.onLoopComplete) doComplete();
                    }

                }

                break;
            }
        }
    },

    done: function(callback) {
        //Set the onComplete callback
        this.onLoopComplete = callback;
        return this;
    },

    start: function(callback) {
        //Set the onComplete callback
        this.onLoopStart = callback;
        return this;
    },

    extend: function(obj, host) {
        if (!host) host = window;

        this.execute(function(i, key, value) {
            host[key] = value;
        }).
        for (obj);

        return host;
    }
};

fn.extend(fn);