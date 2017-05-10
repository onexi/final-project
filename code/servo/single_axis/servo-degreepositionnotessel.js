/***
JM: Can I hard-code the degree-position table and 
interpolate on-board the Tessel?

***/


//based on prior test data (incomplete)
var table_degreeposition = {
	'21': 0,
	'27': 5,
	'35': 10,
	'44': 15,
	'51': 20,
	'58': 25,
	'65': 30
};




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