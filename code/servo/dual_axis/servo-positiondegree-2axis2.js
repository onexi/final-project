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
var servoY = 1; //x-axis
var servoX = 16; //y-axis


servo.on('ready', function () {
	//the servo's target position is between 0 (minimum) and 1 (maximuum)
	//TDC is 0.5 with minPWM = 0.041 and maxPWM = 0.119
	// 0.5 = 90*
	// 0.6 = *
	// 0.65 = 110*

	var positionX = 0.4980; // 0.000 = LEFT
	var positionY = 0.0580; // 0.0000 = DOWN
	
	//settings: 0.05, 0.12
	servo.configure(servoX, 0.025, 0.123, function (){
		setInterval(function () {
			console.log('X:', positionX);
			// Set servo #1 to position
			servo.move(servoX, positionX);
		}, 1000); //500 milliseconds
	});

	servo.configure(servoY, 0.026, 0.057, function (){
		setInterval(function () {
			console.log('Y:', positionY);
			// Set servo #1 to position
			servo.move(servoY, positionY);
		}, 1000); //500 milliseconds
	});

	
});
