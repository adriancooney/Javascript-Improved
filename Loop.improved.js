var fn = {
    execute: function(callback) {
        //Set the callback and onto the this.for where the real magic happens
        this.callback = callback;

        return this;
    },

    for: function(data, time) {

        var that = this,
        //The type, a fix for array because javascript.
        type = (typeof data == "object" && data[0]) ? "array": typeof data;

        //The timed loop
        if (time) {
            //Call the onStart
            if (that.onLoopStart) that.onLoopStart.call();

            //Set the counter
            var i = 0,
            key,
            value,
            //Create the loop
            interval = setInterval(function() {

                //Do the callback
                that.callback.call(that, i, key || null, value || null);

                //Increment the counter
                i++;

                //Stop the counter, data is the count because it's not only a number
                if (i === (data.length || data)) {
                    clearInterval(interval);
                    if (that.onLoopComplete) that.onLoopComplete.call();
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
                        if (that.onLoopComplete) that.onLoopComplete.call();
                    }

                };

                break;

                //Iterate through an array calling the function with the value and count
            case "array":

                //Call the onStart
                if (that.onLoopStart) that.onLoopStart.call();

                for (var i = 0, cache = data.length; i < cache; i++) {

                    //Call the callback with the data
                    that.callback.call(that, i, data[i]);

                    //Stop the loop, decremented the data due to starting at 0
                    if (i == cache - 1) {
                        if (that.onLoopComplete) that.onLoopComplete.call();
                    }

                };

                break;

            case "object":

                //Call the onStart
                if (that.onLoopStart) that.onLoopStart.call();

                //Counter
                var i = 0;

                //Slightly different loop for a slightly different type
                for (var key in data) {
                    //Increment the counter
                    i++;

                    //Call the callback, count, key, data
                    that.callback.call(that, i, key, data[key]);

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