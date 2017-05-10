/***
JM: The intention of this was to run on the Tessel and somehow
magically include the Python bytecode that's 2 degrees of
separation from this file. It didn't work, of course.
I have to re-write this so that it subscribes to an MQTT broker
through which I can relay position-angle requests from the laptop
to the Tessel's servo(s).
***/

require('./servo-degreepositionnotessel.js');



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

	var degree = 90;


	//talk to python linear interpolation lookup table
	//execute python script?
	var pythonScript = "degreeposition.py";
	var pythonExecutable = "python";

	// Function to convert an Uint8Array to a string
	var uint8arrayToString = function(data){
	    return String.fromCharCode.apply(null, data);
	};

	const spawn = require('child_process').spawn;
	const scriptExecution = spawn(pythonExecutable, [pythonScript, degree]);

	// Handle normal output
	var positionTarget = '';
	scriptExecution.stdout.on('data', (data) => {
		positionTarget = uint8arrayToString(data);
	});

	// Handle error output
	scriptExecution.stderr.on('data', (data) => {
	    // As said before, convert the Uint8Array to a readable string.
	    console.log(uint8arrayToString(data));
	});

	scriptExecution.on('exit', (code) => {
	    //console.log("Process quit with code : " + code);
	});



	servo.configure(servo1, 0.043, 0.119, function (){
		setInterval(function () {
			console.log('[degree]=',degree,'; [positionTarget]=', positionTarget);
			// Set servo #1 to position
			servo.move(servo1, positionTarget);
		}, 1000); //500 milliseconds
	});
});