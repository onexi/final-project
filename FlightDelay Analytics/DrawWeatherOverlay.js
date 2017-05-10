// Array to hold information for weather stations
var WeatherStations = [{
        ID:'',
        lat:'',
        long:'',
        TMin:0,
        Prep:0,
        Snow:0,
        Wind:0,
        State:''
    }]

PlotWeather();

// Retrieve weather stations from us_states_stations and add to array
function PlotWeather () { 
    us_states_stations.forEach (function (data) {
        var StationID = data.Station;
        checkAndAddStation (data);
    });  
    WeatherStations.shift();
}

// Check if weather stations are already in array, otherwise add details (lat, long, ID) to array
function checkAndAddStation(item) {
    var lat1;
    var long1;
    var found = WeatherStations.some(function (el) {
        return el.ID == item.Station;
    });
    if (!found) {var result = $.grep(StationCoords, function(e){ return e.StationID == item.Station; });
        if (result.length == 0) {/*console.log ('Weather Station not found')*/;      // not found
        } else {        
            lat1 = Number(result[0].Lat);
            long1 = Number(result[0].Lng);     // access the property to find lat and long
        }
        WeatherStations.push({ID: item.Station, lat: lat1, long: long1, State:item.States2});  
    }
}

// Retrieve weather information from json file. 
function RetrieveWeather() {
    WeatherStations.forEach(function (element) {
        var State = element.State;
        var data = window[State];
        if (typeof(data) == "undefined") {
            console.log("data undefined: "+data +" State: " +State);
            return;
        }
        else {
            var FilterMonth = $.grep(data, function(e){ 
                var Yyyy = e.DATE.slice(0,4);
                var Mm = e.DATE.slice(4,6);
                var Dd = e.DATE.slice(6,9);
                //console.log (Yyyy +'/'+ Mm +'/'+ Dd);
                return Yyyy == year && Mm == month; 
            });
            if (FilterMonth.length == 0) {/*console.log ('Weather Summary Month invalid'+month+' '+year);*/ }     // not found
            else {   
                var MPRCP = 0;
                var MTMIN = 0;
                var MSNOW = 0;
                var MFWS = 0;
                var SnowDays =0;
                FilterMonth.reduce (function (prev, curr) {
                    MPRCP +=Number(curr.PRCP);
                    MTMIN +=Number(curr.TMIN);
                    MFWS +=Number(curr.WSF5);
                    if (curr.SNOW != -9999 && curr.SNOW !=0) {
                        MSNOW +=Number(curr.SNOW);
                        SnowDays +=1;
                    }
                            
                },0)
            }
            element.Prep = (MPRCP / FilterMonth.length).toFixed(2); // Calculate Monthly Average Precipitation
            element.TMin = (MTMIN / FilterMonth.length).toFixed(2);
            element.Snow = (MSNOW/SnowDays).toFixed(2);
            element.Wind = (MFWS / FilterMonth.length).toFixed(2);
        } // end else statement
    }) // end forEach statement
}

// For each weather station, update colour polygon of state based on temperature
function UpdateTempColour () {
     for (var i = 0; i < WeatherStations.length; i++) {
         var temp = WeatherStations[i].TMin;
         var state = WeatherStations[i].State;
         var index = StatePolygons.findIndex(StatePolygons => StatePolygons.state==state);
         var obj = StatePolygons[index];

            if (temp <=-40) {
                obj.setOptions({fillColor: "#ff66ff"});
            }
            if (temp >-40 && temp <= -20) {
                obj.setOptions({fillColor: '#cc33ff'});
            }
            if (temp >-20 && temp <= 0) {
                obj.setOptions({fillColor: '#6600cc'});
            }
            if (temp >0 && temp <= 10) {
                obj.setOptions({fillColor: '#0000ff'});
            }
            if (temp >10 && temp <= 20) {
                obj.setOptions({fillColor: '#3366ff'});
            }
            if (temp >20 && temp <= 30) {
                obj.setOptions({fillColor: '#00ffff'});
            }
            if (temp >30 && temp <= 40) {
                obj.setOptions({fillColor: '#66ff66'});
            }
            if (temp >40 && temp <= 50) {
                obj.setOptions({fillColor: '#ffff66'});
            }
            if (temp >50 && temp <= 60) {
                obj.setOptions({fillColor: '#ff9933'});
            }
            if (temp >60 && temp <= 70) {
                obj.setOptions({fillColor: '#ff3300'});
            }
            if (temp >70) {
                obj.setOptions({fillColor: '#cc0000'});
            }
    }
}
