var data3 = require('./prediction_data.js')
var prediction1 = {};

var Calculatedistance = function(obj1, obj2){
    var a1 = obj1;
    var a2 = obj2;
    var count = 0;
    for (var i = 0; i < 12; i++){
        count += (a1[i]-a2[i])*(a1[i]-a2[i]);
    }
    return Math.sqrt(count);
}
// First, we split the data into train and test files. 

prediction1.one = function(){
    var training = [];
    var testing = [];


    for (i = 0; i < data3.length; i++){
        training.push([]);
        testing.push([]);
        while (training[i].length < 50){
            var random = Math.round(Math.random()*100);
            if (training[i].includes(data3[i][random]) === false && typeof data3[i][random] === 'object'){

                training[i].push(data3[i][random]);
            }
        }
        for (var j = 0; j < data3[i].length; j++){
            if (training[i].includes(data3[i][j]) === false && typeof data3[i][j] === 'object'){
                testing[i].push(data3[i][j])
            }
        }
    }
    var obj = {};
    obj.train = [].concat.apply([], training);
    obj.test = [].concat.apply([], testing);
    return obj;

};

// Then, we calculate the 6 centroids for the data, one for each decade.

prediction1.two = function(data){
    var centroids = [];
    
    var k60 = [0,0,0,0,0,0,0,0,0,0,0,0]
    for (var j = 0; j < 250; j++){
        for (var i = 0; i < 12; i++){
            
            k60[i] += 1/250*data.train[j].point[i];
        }
    }
    var obj60 = {};
    obj60.decade = '1960';
    obj60.center = k60;
    centroids.push(obj60);

    var k70 = [0,0,0,0,0,0,0,0,0,0,0,0]
    for (var j = 250; j < 750; j++){
        for (var i = 0; i < 12; i++){
            k70[i] += 1/500*data.train[j].point[i];
        }
    }
    var obj70 = {};
    obj70.decade = '1970';
    obj70.center = k70;
    centroids.push(obj70);

    var k80 = [0,0,0,0,0,0,0,0,0,0,0,0]
    for (var j = 750; j < 1250; j++){
        for (var i = 0; i < 12; i++){
            k80[i] += 1/500*data.train[j].point[i];
        }
    }
    var obj80 = {};
    obj80.decade = '1980';
    obj80.center = k80;
    centroids.push(obj80);

    var k90 = [0,0,0,0,0,0,0,0,0,0,0,0]
    for (var j = 1250; j < 1750; j++){
        for (var i = 0; i < 12; i++){
            k90[i] += 1/500*data.train[j].point[i];
        }
    }
    var obj90 = {};
    obj90.decade = '1990';
    obj90.center = k90;
    centroids.push(obj90);

    var k00 = [0,0,0,0,0,0,0,0,0,0,0,0]
    for (var j = 1750; j < 2250; j++){
        for (var i = 0; i < 12; i++){
            k00[i] += 1/500*data.train[j].point[i];
        }
    }
    var obj00 = {};
    obj00.decade = '2000';
    obj00.center = k00;
    centroids.push(obj00);

    var k10 = [0,0,0,0,0,0,0,0,0,0,0,0]
    for (var j = 2250; j < 2550; j++){
        for (var i = 0; i < 12; i++){
            k10[i] += 1/300*data.train[j].point[i];
        }
    }
    var obj10 = {};
    obj10.decade = '2010';
    obj10.center = k10;
    centroids.push(obj10);


    return centroids;
}
// For each point in testing, calculate distance from clusters and add that as a property to each object. Then, sort these distances and assign the property "prediction" of the closest centroid.

prediction1.three = function(data, centers){

    for (var i = 0; i < data.test.length; i++){
        var distance = [];
        for (var j = 0; j < 6; j++){
            var obj = {};
            obj.decade = centers[j].decade;
            obj.distance = Calculatedistance(data.test[i].point, centers[j].center);
            distance.push(obj);
        }
        data.test[i].distances = distance;

        data.test[i].distances.sort(function(a,b){
            return a.distance -b.distance;
        });
        data.test[i].distances = data.test[i].distances[0];
    }   
    
    return data;
}
// Finally return the prediction success rate by comparing the match between the decade prediction and the actual decade.

prediction1.four = function(predicted){
    var count = 0;
    for (var i = 0; i < predicted.test.length; i++){
        
        if (Number(predicted.test[i].distances.decade) === (predicted.test[i].decade - predicted.test[i].decade % 10) && predicted.test[i].point != [0,0,0,0,0,0,0,0,0,0,0,0]){
            count = count + 1;
        }
    }
    return count*100/490 + ' per cent of the predictions are correct';
}
prediction1.five = function(dataX){
    var centroids = [];

    var k60 = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i = 0; i < 5; i++){
        for (var j = 0; j < 100; j++){
            for (var k = 0; k < 12; k++){
                k60[k] += 1/500*dataX[i][j].point[k];
            }
        }
    }
    var obj60 = {};
    obj60.decade = '1960';
    obj60.center = k60;
    centroids.push(obj60);

    var k70 = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i = 5; i < 15; i++){
        for (var j = 0; j < 100; j++){
            for (var k = 0; k < 12; k++){
                k70[k] += 1/1000*dataX[i][j].point[k];
            }
        }
    }
    var obj70 = {};
    obj70.decade = '1970';
    obj70.center = k70;
    centroids.push(obj70);

    var k80 = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i = 15; i < 25; i++){
        for (var j = 0; j < 100; j++){
            for (var k = 0; k < 12; k++){
                k80[k] += 1/1000*dataX[i][j].point[k];
            }
        }
    }
    var obj80 = {};
    obj80.decade = '1980';
    obj80.center = k80;
    centroids.push(obj80);

    var k90 = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i = 25; i < 35; i++){
        for (var j = 0; j < 100; j++){
            for (var k = 0; k < 12; k++){
                k90[k] += 1/1000*dataX[i][j].point[k];
            }
        }
    }
    var obj90 = {};
    obj90.decade = '1990';
    obj90.center = k90;
    centroids.push(obj90);

    var k00 = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i = 35; i < 45; i++){
        for (var j = 0; j < 100; j++){
            for (var k = 0; k < 12; k++){
                k00[k] += 1/1000*dataX[i][j].point[k];
            }
        }
    }
    var obj00 = {};
    obj00.decade = '2000';
    obj00.center = k00;
    centroids.push(obj00);

    var k10 = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i = 45; i < 51; i++){
        for (var j = 0; j < 100; j++){
            for (var k = 0; k < 12; k++){
                k10[k] += 1/600*dataX[i][j].point[k];
            }
        }
    }
    var obj10 = {};
    obj10.decade = '2010';
    obj10.center = k10;
    centroids.push(obj10);

    return centroids;
}

module.exports = prediction1;