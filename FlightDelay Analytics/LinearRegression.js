// Consolidate parameters required for regression model into one array
var StatsData = [{
        AirportName:'',
        State:'',
        Month:0,
        Year:0,
        FlightDelay:0,
        TempMin:0,
        Prep:0,
        Snow:0,
        Wind:0,
    }]

// This function extract the weather information based on input state and month/year. 
// Weather information is then pushed to States Data Array
function updateStatsData (Month, Year, Airport, StateName, Delay){
    if (isNaN (Delay)) return;
    if (StateName.length >1) {
        var data = window[StateName];
        if (typeof(data) == "undefined") {
            console.log("data undefined: "+data +" State: " +State);
            return;
        }
        else {
            var FilterMonth = $.grep(data, function(e){ 
                var Yyyy = e.DATE.slice(0,4);
                var Mm = e.DATE.slice(4,6);
                var Dd = e.DATE.slice(6,9);
                return Yyyy == Year && Mm == Month; 
            });   
            if (FilterMonth.length == 0) {}     // not found
            else {   
                var MPRCP = 0;
                var MTMIN = 0;
                var MSNOW = 0;
                var MFWS = 0;
                var SnowDays =0;
                var Snow=0;
                FilterMonth.reduce (function (prev, curr) {
                    MTMIN +=Number(curr.TMIN);
                    if (curr.PRCP != -9999 && curr.SNOW < MPRCP) return;
                    else MPRCP = curr.PRCP
                    if (curr.WSF5 != -9999) MFWS +=Number(curr.WSF5);
                    if (curr.SNOW != -9999 && curr.SNOW !=0) {
                        if (curr.SNOW < MSNOW) return;
                        else MSNOW = curr.SNOW;
                    }
                },0)
            }
            Snow = MSNOW;
            Prep = MPRCP;
            var TMin = (MTMIN / FilterMonth.length).toFixed(2);
            var Wind = (MFWS / FilterMonth.length).toFixed(2);
            StatsData.push({AirportName: Airport, State: StateName, Month: Month, Year: Year, FlightDelay: Delay, TempMin: TMin, Prep: Prep, Snow: Snow, Wind: Wind });
        } // end else statement
    }
}
// Takes in data from StatesData and Plot on charts
function RetrieveData (Parameter){
    var TempArray =[];
    var SnowArray =[];
    var PrepArray = [];
    var WindArray = [];
    var PredictionArray = [{
        snow:0,
        wind:0,
        delay:0
    }];
    StatsData.forEach (function (e) {
        if (e.State == 'Michigan' && (e.Month ==12 || e.Month ==2 || e.Month ==2) && e.Year <2014)  {
            var delay = Number(e.FlightDelay);
            if (isNaN(delay) || delay > 300) return;

            var temp = Number(e.TempMin);
            if (isNaN(temp) || temp<-50) {return;}
            var Tarr = [temp, delay];
            TempArray.push(Tarr);
            
            var snow = Number(e.Snow);
            var Sarr = [snow, delay];
            SnowArray.push(Sarr);
            
            var precp = Number(e.Prep);
            if (isNaN(precp) || precp<0) {return;}
            var Parr = [precp, delay];
            PrepArray.push(Parr);

            var wind = Number(e.Wind);
            if (isNaN(wind)) wind=0;
            var Warr = [wind, delay];
            WindArray.push(Warr);

            PredictionArray.push({snow:snow, wind: wind, delay: delay});
        }
    })

        var parameters = Prediction (PredictionArray);
        if (Parameter == 'Temp') {
                return TempArray;
            }
        if (Parameter == 'Snow') {
                return SnowArray;
        }
        if (Parameter == 'Precp') {
                return PrepArray;
        }
        if (Parameter == 'Wind') {
                return WindArray;
        }
}

var coeff_b1 =0;
var coeff_b2 =0;
var a = 0;
// Calculate regression parameters required to make prediction
function Prediction(Array) {
    var SnowArray = [];
    var WindArray = [];
    var DelayArray = [];
    Array.shift();
    Array.forEach (function (element) {
        SnowArray.push (element.snow);
        WindArray.push (element.wind);
        DelayArray.push (element.delay);
    })
    var corr_snow_wind = corr (SnowArray, WindArray);
    var corr_snow_delay = corr (SnowArray, DelayArray);
    var corr_wind_delay = corr (WindArray, DelayArray);
    var std_delay = std (DelayArray);
    var std_snow = std (SnowArray);
    var std_wind = std (WindArray);

    coeff_b1 = ((corr_snow_delay - corr_wind_delay*corr_snow_wind)*std_delay) / ((1-corr_snow_wind*corr_snow_wind)*std_snow);
    coeff_b2 = ((corr_wind_delay - corr_snow_delay*corr_snow_wind)*std_delay) / ((1-corr_snow_wind*corr_snow_wind)*std_wind);
    a = Calculate_a (WindArray, SnowArray, DelayArray, coeff_b1, coeff_b2 );
    //document.getElementById("Parameters").innerHTML = a;
}

// Update Prediction value based on calculated parameters from Prediction()
function GeneratePrediction() {
    var X1 = document.getElementById("Input_snow").value;
    var X2 = document.getElementById("Input_wind").value;
    var Y = (a + coeff_b1*X1 + coeff_b2*X2).toFixed(0);
    document.getElementById("Prediction").innerHTML = Y + " Minutes" + '<p>< --- Calculated using Linear Regression Formula: [Y =  a + B1*X1(Snowfall) + B2*X2(Wind Speed)] --- ><p>a: ' + a +'<p> <p>B1: ' + coeff_b1 +'<p>B2: ' + coeff_b2;
}

// function to calculate a
function Calculate_a (Wind, Snow, Delay, b1, b2) {
    var Wind_sum = 0;
    var Snow_sum = 0;
    var Delay_sum = 0;
    var n=0;
    var m=0;
    var p=0;

    for (i=0; i<Wind.length; i++)  {
            Wind_sum += Wind[i];
            n+=1;
    }
    var Wind_mean = Wind_sum/n;
    for (i=0; i<Snow.length; i++)  {
            Snow_sum += Snow[i];
            m+=1;
    }
    var Snow_mean = Snow_sum/m;
    for (i=0; i<Delay.length; i++)  {
            Delay_sum += Delay[i];
            p+=1;
    }
    var Delay_mean = Delay_sum/p;
    var a = (Delay_mean - b1*Snow_mean - b2*Wind_mean);
    return a;
}

// Calculate standard deviation
function std (array) {
        var sum = 0;
        var n=0;

        for (i=0; i<array.length; i++)  {
            sum += array[i];
            n+=1;
        }
        var mean = sum/n;
        var sum_sq = 0;
        for (j=0; j<array.length; j++) {
            sum_sq += Math.pow ((array[j] - mean), 2);
        }
        return Math.sqrt (sum_sq/n);
}

// Calculate correction coefficient
function corr (Arr1, Arr2) {
    var sum_Arr1_sq = 0;
    var sum_Arr2_sq = 0;
    var sum_Arr1 = 0;
    var sum_Arr2 = 0;
    var n = 0;
    var mean_Arr1 = 0;
    var mean_Arr2 = 0;

    for (i=0; i<Arr1.length; i++){
        sum_Arr1_sq += Arr1[i] * Arr1[i];
        sum_Arr2_sq += Arr2[i] * Arr2[i];
        sum_Arr1 += Arr1[i];
        sum_Arr2 += Arr2[i];
        n += 1; 
    }
    mean_Arr1 = sum_Arr1/n;
    mean_Arr2= sum_Arr2/n;
    var sum_ab = 0;
    var sum_a_sq = 0;
    var sum_b_sq = 0;

    for (j=0; j<Arr1.length; j++){
        sum_ab += (Arr1[j] - mean_Arr1) * (Arr2[j] - mean_Arr2);
        sum_a_sq += Arr1[j] * Arr1[j] ;
        sum_b_sq += Arr2[j]  * Arr2[j] ;
    }

    var corr = sum_ab / Math.sqrt(sum_a_sq * sum_b_sq);
    return corr;
}
    