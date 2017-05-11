var data4 = require('./prediction_data.js')

var prediction2 = {};

var Calculatedistance = function(obj1, obj2){
    var a1 = obj1;
    var a2 = obj2;
    var count = 0;
    for (var i = 0; i < 12; i++){
        count += (a1[i]-a2[i])*(a1[i]-a2[i]);
    }
    return Math.sqrt(count);
}

//First, we are going to calculate the centroids for the ten categories of each year since 2010.
prediction2.one = function(dat){
    var data = dat.slice(45, 51);

    var getTopXcentroids = function(element){

        var centroids = [];
        for (var k = 0; k < 10; k++){
            
            var centerk = [0,0,0,0,0,0,0,0,0,0,0,0]
            for (var i = 10*k; i < 10*(k+1); i++){
                for (var j = 0; j < 12; j++){
            
                    centerk[j] += 1/10*element[i].point[j];
                }
            }
            var objk = {};
            objk.ranking = 10*k+10;
            objk.center = centerk;
            centroids.push(objk);
        }
        return centroids;
    };

    return data.map(getTopXcentroids);
}

//Then, we do a linear regression on the centroids of years 2010-2015 to predict the ten centroids for the year 2016.

prediction2.two = function(centers2){

    var linearCoefficients = [];

    var X = [0,1,2,3,4,5];
    SX = 15;
    SXX = 55;

    for (var t = 0; t < 10; t++){
        var a = [0,0,0,0,0,0,0,0,0,0,0,0];
        var b = [0,0,0,0,0,0,0,0,0,0,0,0];
        for (var k = 0; k < 12; k++){
             var SXY = 0;
             var SY = 0;
             for (var i = 0; i < 5; i++){
                 SXY += X[i]*centers2[i][t].center[k];
                 SY += centers2[i][t].center[k];
             }
             a[k] = (SXY -(SX*SY)/6)/(SXX - SX*SX/6);
             b[k] = ((SY - a[k]*SX)/6);
        }
        var obj = {};
        obj.slope = a;
        obj.constant = b;
        linearCoefficients.push(obj);
    }

    //We finally predict the centroids for the year 2016 using the linear regression.
    var centroid2016 = [];
    for (var l = 0; l < 10; l++){
        var obj = {};
        obj.rank = 10*l+10;
        var center = [0,0,0,0,0,0,0,0,0,0,0,0];
        for (var m = 0; m < 12; m++){
            center[m] = linearCoefficients[l].slope[m]*6 + linearCoefficients[l].constant[m];
        }
        obj.centroid = center;
        centroid2016.push(obj);
    }

    return centroid2016;
}

// Finally, predict the rank of the input lyrics using the predicted 2016 centroids.

prediction2.three = function(linear, input){

    var distances = [];
    for (var i = 0; i < linear.length; i++){
        var obj = {};
        obj.rank = linear[i].rank;
        obj.distance = Calculatedistance(linear[i].centroid, input);
        distances.push(obj);
    }
    distances.sort(function(a,b){
            return a -b;
    });

    var popularity = distances[0].rank;

    return popularity;

}




module.exports = prediction2;