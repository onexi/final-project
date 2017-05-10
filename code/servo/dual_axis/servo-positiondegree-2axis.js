/***
JM: 
Turn the servo 1/10th of its full rotation every 500ms. 
Then reset after 10 turns. 
Reads out position to the console at each movement.
***/

var tessel = require('tessel');
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['A']);

//servo is in position 1 on the board
var servo1 = 1;


servo.on('ready', function () {
	//the servo's target position is between 0 (minimum) and 1 (maximuum)
	//TDC is 0.5 with minPWM = 0.041 and maxPWM = 0.119
	// 0.5 = 90*
	// 0.6 = *
	// 0.65 = 110*
	var position = 0.0; 
//0.05, 0.12
	servo.configure(servo1, 0.026, 0.057, function (){
		setInterval(function () {
			console.log('Position (in range 0-1):', position);
			// Set servo #1 to position
			servo.move(servo1, position);
		}, 1000); //500 milliseconds
	});
});
