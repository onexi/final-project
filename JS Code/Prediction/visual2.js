var input = require('./lyrics_data2.js');
var project = {};

// First, I will treat the initial data set, initially a large array of length 30600 into an array of 51 arrays (one for each year). Each individual array will contain 100 objects, one for each top 100 song of that year. Each object contains the year, the rank, the artist, the song title and the lyrics.
project.one = function(){
    
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
        obj.artist = element[2];
        obj.title = element[1];
        obj.lyrics = element[4].split(' ').filter(Boolean);     //I also seperate the lyrics into an array of single                                                                words and remove empty string elements.
        return obj;
    };

    for (var k = 0; k < arrays.length; k++){
        for (var l = 0; l < arrays[k].length; l++){
            arrays[k][l] = createObject(arrays[k][l]);
        }
    }
    var data = arrays;
    return data;
};

//Visualisation n°1
//Return the length of each song for every year as an (x,y,z) point, x being the year, y the number of words and z the number of different words.
project.two = function(data){
       
    var Len = [];
    for (var j = 0; j < data.length; j++){
        for (var k = 0; k < data[j].length ; k++){
            if (data[j][k].lyrics.length > -1){
                var obj = {};
                obj.year = data[j][k].year;
                obj.len = data[j][k].lyrics.length/1180;
                //obj.richness = richnessCount(data[j][k].lyrics);
                Len.push(obj);
            }
        }
    }
    return Len;
};

project.three = function(data){
    var richnessCount = function(element){
        var uniquewords = [];
        for (var i = 0; i < element.length; i++){
            if (uniquewords.includes(element[i]) === false){
                uniquewords.push(element[i]);
            }
        }
        return uniquewords.length;
    };
    
    
    var Rich = [];
    for (var j = 0; j < data.length; j++){
        for (var k = 0; k < data[j].length ; k++){
            if (data[j][k].lyrics.length > -1){
                var obj = {};
                obj.year = data[j][k].year;
                //obj.length = data[j][k].lyrics.length;
                obj.richness = richnessCount(data[j][k].lyrics)/440;
                Rich.push(obj);
            }
        }
    }
    return Rich;
};


module.exports = project;