/**		Created by Adrian Cooney
 ** 	17/5/11
 **
 ** 	//Generate an integer (0-100)
 ** 	Math.rand() or Math.rand("int")
 **
 **		//Generate random number between 5 and 11
 ** 	Math.rand(5,11)
 **	
 **		//Generate number between 0 and 100
 **		Math.rand(100)
 **	
 **		//Generate a floating point
 **		Math.rand("float") or, of course, Math.random()
 **	
 **		//Generate dice numbers
 **		Math.rand("dice")
 **	
 **		//Generate a coin flip (true or false)
 **		Math.rand("coin")
 **	
 **		//Generate an array of random numbers of a given length
 **		Math.rand("array", 10)
 **	
 **		//Generate an array of random numbers in a given scope of a given length (0-100)
 **		Math.rand("array", 10, 100)
 **	
 **		//Generate an array of random numbers in a given scope of a given length (eg. 30 - 90)
 **		Math.rand("array", 10, 30, 90)
 **/

Math.rand = function(type, max, min, arr) {
	var returnable;
	
	function range(mx, mi) {
		return Math.floor(Math.random() * (mx - mi + 1)) + mi;
	}
	
	function scope(sp) {
		return Math.floor(Math.random() * sp);
	}
	
	function each(arr, fn) {
		var length = (typeof arr == "number") ? arr : arr.length
		for (var i=0; i < length; i++) {
			fn.call(i, arr[i]);
		};
	}
	
	range(10, 20);
	
	switch ( type ) {
		case "int":
			if(max && min) {
				if(max && !min) returnable =  range(max, min);
				else returnable =  scope(type);
			} else {
				returnable =  scope(101);
			}
		break;
		
		case "array":
			var array = [];
			if(arr) {
				each(max, function() {
					array.push(range(min, arr));
				});
			} else {
				if(min) {
					each(max, function() {
						array.push(scope(min));
					});
				} else {
					each(max, function() {
						array.push(scope(101));
					});
				}
			}
			returnable =  array;
		break;
		
		case "dice":
			returnable =  scope(7);
		break;
		
		case "coin":
			returnable =  (scope(2) == 1) ? true : false;
		break;
		
		case "float":
			returnable =  Math.random();
		break;
		
		default: 
			if(typeof type == "number") {
				if(type || type == 0 && max) returnable = range(type, max);
				if(type || type == 0 && !max) returnable =  scope(type);
			} else {
				returnable =  scope(101);
			}
	}
	
	return returnable;
};

/** Math.convert
 ** 	toDeg(radian) -- Converts radian to degree
 ** 	toRad(degree) -- Converts degree to radian
 **/
Math.convert = { 
	toRad: function(deg) { 
		return deg*(Math.PI/180) 
	},
	toDeg: function(rad) {
		return rad*(180/Math.PI);
	}
};