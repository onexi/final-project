var gridX = 7.5;
var gridY = 5;

//execute python script?
var pythonScript = "degreeposition-dualaxis.py";
var pythonExecutable = "python";

// Function to convert an Uint8Array to a string
var uint8arrayToString = function(data){
    return String.fromCharCode.apply(null, data);
};

const spawn = require('child_process').spawn;
const scriptExecution = spawn(pythonExecutable, [pythonScript, gridX, gridY]);

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