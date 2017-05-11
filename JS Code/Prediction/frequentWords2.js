var input = require('./data5_frequentWords2.js');
var frequent = {};

// Returns the percentage of the top 100 words used in popular lyrics present in the song.
frequent.one = function(data){
    var countWords = function(element){
        var count = 0;
        for (var i = 0; i < input.length; i++){
            if (element.lyrics.includes(input[i])){
                count = count + 1;
            }
        }
        return count/100;       
    }
    var giveFrequent = function(item){
        var obj = {};
        obj.year = item[0].year;
        obj.frequent = [].concat.apply([], item.map(countWords));
        return obj;
    }
    return data.map(giveFrequent);
};

module.exports = frequent;