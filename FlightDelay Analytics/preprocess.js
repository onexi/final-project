var CSVtoJSON = require('node-csv-json');

// This js file is used to pre-process data extracted from the web and is not used during runtime. 

/*
// Concat multiple json files into one. 
function Concatfiles () {
    var jsonConcat = require("json-concat");
    jsonConcat({
        src: ["Alabama.json", "Alaska.json", "Arizona.json", "Arkansas.json", "California.json", "Colorado.json", "Connecticut.json", "Delaware.json", 
        "Florida.json", "Georgia.json", "Hawaii.json", "Idaho.json", "Illinois.json", "Indiana.json", "Iowa.json", "Kansas.json", "Kentucky.json",
        "Louisiana.json","Maine.json","Maryland.json","Massachusetts.json","Michigan.json","Minnesota.json","Mississippi.json","Missouri.json","Montana.json",
        "Nebraska.json","Nevada.json","New Hampshire.json","New Jersey.json","New Mexico.json","New York.json","North Carolina.json","North Dakota.json",
        "Ohio.json","Oklahoma.json","Oregon.json","Pennsylvania.json","Rhode Island.json","South Carolina.json","South Dakota.json","Tennessee.json",
        "Texas.json","Utah.json","Vermont.json","Virginia.json","Washington.json","West Virginia.json","Wisconsin.json","Wyoming.json"],
        dest: "./CombinedStates.json"
    }, function (json) {
        console.log(json);
    });
}*/

// Convert Weather Stations from CSV to JSON
    CSVtoJSON({
        input: './WeatherData/Stations/Michigan.csv',      //+Year+'.csv',
        output: './WeatherDatajson/Michigan.json',  //+Year+'.json'    
    }, function(err, result){
        if(err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });

/*
// Read all files in a directory and convert them to json format. 
const Folder = './WeatherData/Stations/';
const fs = require('fs');
fs.readdir(Folder, (err, files) => {
  files.forEach(file => {
    var filename = file.substring(0, file.length-4);
    console.log(filename);
    convert (filename);
  });
})

function convert (file){
    CSVtoJSON({
        input: './WeatherData/Stations/' +file + '.csv',      //+Year+'.csv',
        output: './WeatherDatajson/' +file +'.json'  //+Year+'.json'    
    }, function(err, result){
        if(err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });

}
*/