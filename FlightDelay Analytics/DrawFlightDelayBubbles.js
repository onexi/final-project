var airports = [{
        name:'',
        lat:'',
        long:'',
        magnitude:0,
        state:''
    }]
var AirportCircles = [];
var StatePolygons =[];
var StartYear = 2010;
var StartMonth = 1;
var EndYear = 2016;
var EndMonth = 12;
var month = StartMonth;
var year = StartYear;

PlotAirports();

// Plot all airports based on flight delay json file.
function PlotAirports () {
    Year2016.forEach (function (data) {
        var temp = data.airport;
        checkAndAdd (temp);
    });  
    airports.shift();
}

// Check and update unique airport locations
function checkAndAdd(name) {
    var lat1;
    var long1;
    var state1;
    var found = airports.some(function (el) {return el.name === name;});
    if (!found) {var result = $.grep(AirportCoods, function(e){ return e.AIRPORT == name; });
        if (result.length == 0) {console.log ('not found');      // not found
        } else {        
            lat1 = Number(result[0].LATITUDE);
            long1 = Number(result[0].LONGITUDE);     // access the property to find lat and long
            state1 = result[0].AIRPORT_STATE_NAME;
            state1 = state1.replace(/\s/g,'');
        }
        airports.push({name: name, lat: lat1, long: long1, magnitude: 0, state: state1 });  
    }
}

//This function filters flight delay info based on Year and Month, then calculate the average flight delay time for each airport.
function RetrieveDelays() {
    var data = window['Year' + year];
    var FilterDate = $.grep(data, function(e){ return e.year == year && e.month == month; });
    //console.log ('FilterDate year: ' + FilterDate[0].year +'FilterDate month: ' + FilterDate[0].month);
    if (FilterDate.length == 0) {console.log ('date range not found'+month+' '+year); }     // not found
         else {        
            airports.forEach (function (airport){
                var FilterAirport = $.grep(FilterDate, function(f){ return f.airport == airport.name; });
                if (FilterAirport.length == 0) {/*console.log ('airport not found');*/}      // not found
                else {
                    var AirlineDelayTotal = 0;
                    var ArrFlightsTotal = 0;
                    FilterAirport.reduce (function (prev, curr) {
                        AirlineDelayTotal += Number(curr.weather_delay);
                        ArrFlightsTotal += Number(curr.arr_flights);
                    },0)
                }
                airport.magnitude = (AirlineDelayTotal / ArrFlightsTotal)*60;
                updateStatsData (month, year, airport.name, airport.state, airport.magnitude);
            })
        }
    return;
}

// Function to update flight delays at each airport (circle radius)
// Also update state polygon colours based on temperature
function AnimateAirports() {
    if(month == EndMonth && year == EndYear) {}
    else {
        RetrieveDelays ();
        UpdateRadius();
        RetrieveWeather();
        UpdateTempColour(); 
        if (month >= 12) {
            month =1;
            year +=1;
        }
        else if (month <12) month +=1;
        setTimeout(AnimateAirports, 1000);
    }
    document.getElementById("Date Display").innerHTML = 'Year: ' +year + '   Month: '+month;  
}

// Update circle radius based on magnitude of flights delay at each airport
function UpdateRadius () {
     for (var i = 0; i < AirportCircles.length; i++) {
         var rad = airports[i].magnitude;
         var obj = AirportCircles[i];
         obj.setRadius(rad * 250);
    
    }
}




              


