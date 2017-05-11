var project = require('./visual1.js');
var vulgar = require('./vulgarity.js');
var topics = require('./topics.js');
var frequent = require('./frequentWords.js');
var sentiment = require('./sentiment.js');
var repetition = require('./repetition.js');
var jsonfile = require('jsonfile');

var data = project.one();
//console.log(data);

var file0 = './treated_data.json'

jsonfile.writeFile(file0, data, function(err){
    console.log(err)
})

var solution1 = project.two(data);
//console.log(solution1);
var file1 = './data1_length.json'

jsonfile.writeFile(file1, solution1, function(err){
    console.log(err)
})

var solution2 = project.three(data);
//console.log(solution2);
var file2 = './data2_richness.json'

jsonfile.writeFile(file2, solution2, function(err){
    console.log(err)
})

var solution3 = vulgar.one(data);
//console.log(solution3);
var file3 = './data3_vulgar.json'

jsonfile.writeFile(file3, solution3, function(err){
    console.log(err)
})

var solution4 = topics.one(data);
//console.log(solution4);
var file4 = './data4_topics.json'

jsonfile.writeFile(file4, solution4, function(err){
   console.log(err)
})

var solution5 = frequent.one(data, 100);
//console.log(solution5);
var file5 = './data5_frequentWords.json'
jsonfile.writeFile(file5, solution5, function(err){
   console.log(err)
})

var solution6 = sentiment.one();
//console.log(solution6);
var file6 = './data6_sentiment.json'
jsonfile.writeFile(file6, solution6, function(err){
   console.log(err)
})

var solution7 = repetition.one(data, 5, 4);
//console.log(solution7);
var file7 = './data7_repetition.json'
jsonfile.writeFile(file7, solution7, function(err){
   console.log(err)
})