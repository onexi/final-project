var repetition = {};

repetition.one = function(data, k, n){

    var countRepetedWords = function(element){
        var wordCounts = {};
        var repetedWords = [];
        for (var j = 0; j < element.lyrics.length; j++){
            if (element.lyrics[j].length > n-1){
                wordCounts[element.lyrics[j]] = (wordCounts[element.lyrics[j]] || 0) + 1;
            }
        }
        for (words in wordCounts){
            if (wordCounts[words] > k-1){
                repetedWords.push(words);
            }
        }
        return repetedWords.length;
    };

    var repetitionPerYear = function(item){
        var repetedYear = [];
        for (var i = 0; i < item.length; i++){
            var obj = {};
            obj.year = item[i].year;
            obj.repeted = countRepetedWords(item[i])/10;
            repetedYear.push(obj);
        }
        return repetedYear;
    }

    return [].concat.apply([], (data.map(repetitionPerYear)));;
};


module.exports = repetition;