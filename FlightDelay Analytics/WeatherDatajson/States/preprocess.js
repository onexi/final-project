var CSVtoJSON = require('node-csv-json');
/*
["Alabama.json", "Alaska.json", "Arizona.json", "Arkansas.json", "California.json", "Colorado.json", "Connecticut.json", "Delaware.json", 
"Florida.json", "Georgia.json", "Hawaii.json", "Idaho.json", "Illinois.json", "Indiana.json", "Iowa.json", "Kansas.json", "Kentucky.json",
"Louisiana.json","Maine.json","Maryland.json","Massachusetts.json","Michigan.json","Minnesota.json","Mississippi.json","Missouri.json","Montana.json",
"Nebraska.json","Nevada.json","New Hampshire.json","New Jersey.json","New Mexico.json","New York.json","North Carolina.json","North Dakota.json",
"Ohio.json","Oklahoma.json","Oregon.json","Pennsylvania.json","Rhode Island.json","South Carolina.json","South Dakota.json","Tennessee.json",
"Texas.json","Utah.json","Vermont.json","Virginia.json","Washington.json","West Virginia.json","Wisconsin.json","Wyoming.json"]
*/
Concatfiles();

function Concatfiles () {

    var concat = require('concat-files');
 
  concat([
    "Alabama.json", "Alaska.json"], './combined.json', function(err) {
    if (err) throw err
    console.log('done');
  });

}

  /*
    var jsonConcat = require("json-concat");
    jsonConcat({
        src: ["Alabama.json", "Wyoming.json"],
        dest: "./CombinedStates.json"
    }, function (json) {
        console.log('json: '+json);
    });
 */ 



/*
// Convert Weather Stations from CSV to JSON
    CSVtoJSON({
        input: './WeatherData/WeatherStations.csv',      //+Year+'.csv',
        output: './WeatherDatajson/WeatherStations.json'  //+Year+'.json'    
    }, function(err, result){
        if(err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
*/
/*
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

/*
//Convert Flight Data csv to json with range of FromYear ToYear
//for (var i=FromYear; i<=ToYear; i++){
    //var Year = i;
    CSVtoJSON({
        input: './FlightData/Airport Coordinates.csv',      //+Year+'.csv',
        output: './FlightDatajson/AirportCoods2.json'  //+Year+'.json'    
    }, function(err, result){
        if(err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
//}
*/


/*
 var xhr = new XMLHttpRequest();
    
    var url = "https://api.weathersource.com/v1/8836c9a7500f7446d93d/postal_codes/02199,US/forecast.json?period=hour&fields=temp";
    xhr.open('GET', url, true);
    //xhr.open('GET', "https://api.weathersource.com/v1/8836c9a7500f7446d93d/history.json?latitude_eq=32.7153&longitude_eq=-117.1564&period=hour&timestamp_eq=2004-02-12T08:00&fields=temp", true);
    xhr.send();
 
    xhr.onreadystatechange = processRequest;
 
    function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            alert(response.ip);
        }
    }
*/