#Javascript Improved#
###Overview###
This simple library is my take on improving and adding to some of Javascript's functionality. I am in no way hatin' on Javascript but I find myself writing the same stuff over and over, so I decided to just contain it in a syntax I'd like to use. Sorry about the pretty terrible documentation. My goal was not to release it to the public but more so for personal use. 

What I have (maybe) improved/added so far:

*	Random function
*	Conversion of Degrees/Radians
*	Loops 
*	Extending Objects
*	typeof
*       $ and $$ for document selection

###Usage###

* 	##__Random function__ -- `Math.rand`  
	Improved Javascript's random number generation by the ability to add range and scopes.  

	 1. __Generate an integer (0-100)__ 
	 `Math.rand() or Math.rand("int")`

	 2. __Generate random number between 5 and 11__  
	 `Math.rand(5,11)`

	 3. __Generate number between 0 and 100__  
	 `Math.rand(100)`

	 4. __Generate a floating point__  
	 `Math.rand("float") or, of course, Math.random()`
 
	 5. __Generate dice numbers__   
	 `Math.rand("dice")`

	 6. __Generate a coin flip (true or false)__  
	 `Math.rand("coin")`

	 7. __Generate an array of random numbers of a given length__  
	 `Math.rand("array", 10)`

	 8. __Generate an array of random numbers in a given scope of a given length (0-100)__  
	 `Math.rand("array", 10, 100)`

	 9. __Generate an array of random numbers in a given scope of a given length (eg. 30 - 90)__  
	 `Math.rand("array", 10, 30, 90)`
	
	
*	##__Conversion of Degrees/Radians__ -- `Math.convert`  
	Adds conversion of degrees into radians and vice-versa.  
	
	1. __Degrees into radians__ 
	`Math.convert.toRad(degree)`
	
	2. __Radians into degrees__  
	`Math.convert.toDeg(radian)`
	

* 	##__Loops__ -- `execute, for, done`  
	Probably the most use 'improvement'. Simplifies Javascript's for loop.  
	
	__Syntax:__  
		execute(function(index [, value | key, value]))[.done(function)].for(integer|array|object [,duration]);
		
	__Examples:__ 
	
		/** Basic for loop **/
		//Improved
		execute(function(index) {
			console.log(index);
		}).for(200); //Run the above code 200 times
		
		//Javascript equivalent
		for(var i = 0; i<200; i++) {
			console.log(i);
		}
		
		/** Loop through array **/
		//Improved
		var someArray = [1, 2, 3, 4, 5, 6, "foo", "bar", false];
		execute(function(index, value) {
			console.log("Value is " + value);
			console.log("Value also is " + someArray[index]);
		}).for(someArray); //Run the above code for each value in someArray
		
		//Javascript equivalent
		var someArray = [1, 2, 3, 4, 5, 6, "foo", "bar", false];
		for(var i = 0; i<someArray.length; i++) {
			console.log("Value is " + someArray[i]);
		}
		
		/** Loop through Object **/
		//Improved
		var someObject = {foo: "bar", "user": 1 };
		execute(function(index, key, value) {
			console.log("Key: " + key + " and Value: " + value);
		}).for(someObject); //Run the above for each value in someObject
		
		//Javascript equivalent
		var someObject = {foo: "bar", "user": 1 };
		for(var key in someObject) {
			console.log("Key: " + key + " and Value: " + someObject[value]);
		}
		
        /** Timed loop **/
        //Improved
        execute(function(index) {
            console.log("BAM! " + i*1000 + " seconds.");
        }).for(20, 1000); //Run the above code 20 times with a delay of 1000ms between each iteration
        //Note, the iteration count only supports integers, not arrays or objects.
        
        //Javascript equivalent
        var i = 0,
        limit = 20,
        loop = setInterval(function() {
            console.log("BAM! " + i*1000 + " seconds.");
            i++;
            if(i == limit-1) clearInterval(loop);
        });
        
        /** Loop with callback **/
        //Improved
        execute(function() {
            console.log("Nevermind me.");
        }).done(function() {
            console.log("Done!");
        }).for(20);
        //The .done can be applied to all types of loops
        //but _has_ to be before the .for function.
        
        //Javascript equivalent
        var limit = 20;
		for(var i = 0; i<limit; i++) {
                    console.log("Nevermind me.");
                    
                    if(i == limit-1) console.log("Done!");
		}

*   ##__Extending Objects__ -- `extend`  
    Extend Javascript objects much like jQuery's jQuery.extend.  
    
    __Syntax:__  

            extend(object [, host])
            
    __Example:__

            var host = {},
            object = { foo: "bar" };
            //Extend the object into the host
            extend(obj, host); //host = { foo: "bar" }
                
                
*   ##__Typeof__ -- `typeOf`  
   Barely improved the `typeof` functionality, just add's supports for object. I really only reccommend using this if you need to know if the data is an object or array but you can pass any data to it. Simples.  
   
   __Syntax:__ 
 
           typeOf(variable)
       
   __Example:__  

           var obj = {},
           arr = [];
           
           typeOf(obj); //"object"
           typeOf(arr); //"array"
        
*  ##__Selecting__ -- `$ | $$`  
   Just a simple shortcut for document.querySelectorAll and document.getElementById. __This is by no means a replacement for Sizzle.js!__  
   
   Syntax:

           $(selector) //document.querySelectorAll
           $$(id) //document.getElementById
           
   Examples:

           $("body"); //Returns nodelist
           $$("body"); //Returns element with ID 'body'
                
