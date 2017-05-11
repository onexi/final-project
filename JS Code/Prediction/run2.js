var project = require('./visual2.js');
var vulgar = require('./vulgarity2.js');
var topics = require('./topics2.js');
var frequent = require('./frequentWords2.js');
var sentiment = require('./sentiment2.js');
var repetition = require('./repetition2.js');
var jsonfile = require('jsonfile');

var data = project.one();

var solution1 = project.two(data);
//console.log(solution1);
var solution2 = project.three(data);

var solution3 = vulgar.one(data);

var solution4 = topics.one(data);

var solution5 = frequent.one(data);

var solution6 = sentiment.one();

var solution7 = repetition.one(data, 5, 4);

var file0 = './prediction_data.js'

var buildPredictObject = function(data){
    var arrays = []; 
    for (var i = 0; i < data.length; i++){
        var array = [];
        for (var j = 0; j < data[i].length; j++){
            var obj = {};
            obj.decade = data[i][j].year;
            obj.rankAbs = data[i][j].rank;
            obj.rank = Math.ceil(data[i][j].rank/10)*10;
            var coordinates = [];
            coordinates.push(solution1[100*i+j].len);
            coordinates.push(solution2[100*i+j].richness);
            coordinates.push(solution3[i].vulgar[j]);
            coordinates.push(solution4[i].music[j]);
            coordinates.push(solution4[i].lifestyle[j]);
            coordinates.push(solution4[i].party[j]);
            coordinates.push(solution4[i].love[j]);
            coordinates.push(solution4[i].religion[j]);
            coordinates.push(solution4[i].death[j]);
            coordinates.push(solution5[i].frequent[j]);
            coordinates.push(solution6[100*i+j].lyrics);
            coordinates.push(solution7[100*i+j].repeted);
            obj.point = coordinates;
            array.push(obj);
        }
        arrays.push(array);
    }
    return arrays;   
}
var solutionFinal = buildPredictObject(data);
//console.log(solutionFinal[2])
jsonfile.writeFile(file0, solutionFinal, function(err){
   console.log(err)
})