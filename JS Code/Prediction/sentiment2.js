var input = require('./lyrics_data2.js');
var ml = require('ml-sentiment')();
var sentiment = {};

sentiment.one = function(){
    // First I divide the array into 51 arrays.
    var rawdata = [];
    for (var i = 0; i < input.length/600; i++){
        rawdata.push(input.slice(600*i, 600*(i+1)));
    }  
    
// Then I divide each 51 array into 100 arrays for the songs.
    var songdivide = function(element){
        var songs = [];
        for (var j = 0; j < 100; j++){
            songs.push(element.slice(6*j, 6*(j+1)));
        }
        return songs;
    };
    var arrays = rawdata.map(songdivide);



// Finally we transform each song "array" into a song "object" with 5 properties (year, rank, artist, title, lyrics) to make it more usable. 


    var createObject = function(element){
        var obj = {};
        obj.year = element[3];
        obj.rank = element[0];
        obj.lyrics = ml.classify(element[4])/100;     //I also seperate the lyrics into an array of single                                                                words and remove empty string elements.
        return obj;
    };
    var createObject2 = function(element){
        var obj = {};
        obj.year = element[3];
        obj.rank = element[0];
        obj.lyrics = Math.floor(Math.random()*(-2)+1);     //I also seperate the lyrics into an array of single                                                                words and remove empty string elements.
        return obj;
    };

    for (var k = 0; k < arrays.length; k++){
        for (var l = 0; l < arrays[k].length; l++){
            
                arrays[k][l] = createObject(arrays[k][l]);
        }
    }
    return [].concat.apply([], arrays);
};

module.exports = sentiment;