var prediction1 = require('./decade-prediction.js')
var prediction2 = require('./popularity-prediction.js')
var dataX = require('./prediction_data.js')
var jsonfile = require('jsonfile');

//var data = prediction1.one();
//console.log(data);

//var file10 = './testingtraining.js'
//jsonfile.writeFile(file10, data, function(err){
//    console.log(err)
//});
//var centers = prediction1.five(dataX);
//console.log(centers);
//var fileX = './finalcenters.js'
//jsonfile.writeFile(fileX, centers, function(err){
//    console.log(err)
//})

//var predicted = prediction1.three(data, centers);
//console.log(predicted);

//console.log(prediction1.four(predicted));

var centers2 = prediction2.one(dataX);
//console.log(centers2[5])

var linear = prediction2.two(centers2);
console.log(linear)
var file2016 = './finalcenters2016.js'
jsonfile.writeFile(file2016, linear, function(err){
    console.log(err)
})