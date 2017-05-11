var frequent = {};
// Returns the k most present words in all lyrics.
frequent.one = function(data, k){
    var numberCount = [];
    var onlyLyrics = function(element){
        var lyrics = [];
        for (var i = 0; i < element.length; i++){
            lyrics.push(element[i].lyrics)
        }
        return [].concat.apply([], lyrics);
    }
    
    
    allLyrics = [].concat.apply([], (data.map(onlyLyrics)));
    
    var wordCounts = {};
    for (var j = 0; j < allLyrics.length; j++){
        wordCounts[allLyrics[j]] = (wordCounts[allLyrics[j]] || 0) + 1;
    }

    var sortable = [];
    for (var word in wordCounts){
        sortable.push([word, wordCounts[word]]);
    };
    sortable.sort(function(a,b){
        return a[1] - b[1];
    })
    var n = sortable.length;
    var final1 = sortable.slice(n - k, n);

    var final2 = [];
    for (var i = 0; i < final1.length; i++){
        var obj = {}
        obj.word = final1[i][0];
        obj.count = final1[i][1];
        final2.push(obj);
    }

    return final2;

};

module.exports = frequent;