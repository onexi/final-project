var themes = 
    [{theme: 'music', wordbank: ['music', 'song', 'sing', 'rap', 'rock', 'jazz', 'disco']},
    {theme: 'lifestyle', wordbank: ['money', 'car', 'friend', 'spend', 'fly', 'travel', 'beer', 'limousine']},
    {theme: 'party', wordbank: [ 'dance', 'night', 'friends', 'dj', 'party', 'tonights', 'girls', 'drink', 'drinking', 'dancing','club', 'bass']},
    {theme: 'love', wordbank: ['woman','love', 'girl', 'heart', 'kiss', 'sex', 'sexy', 'face', 'lovin', 'baby', 'sweet']},
    {theme: 'religion', wordbank: ['god', 'pray', 'religion', 'lord']},
    {theme: 'death', wordbank: ['death', 'die', 'dead', 'war', 'kill', 'murder', 'bullet', 'gun', 'shoot', 'shot']},
    {theme: 'politics', wordbank: ['politics', 'politician', 'politicians', 'social', 'injustice', 'government', 'congressman', 'terrorism', 'terrorists', 'law', 'laws', 'trial', 'trials']}
    ];

var topics = {};
topics.one = function(data){

    var add = function(a, b){
        return a + b;
    };

    var themeCount = function(element){
        var obj = {};
        obj.year = element[0].year;
        
        obj.music = 0.01*element.map(function(item){
            var count = 0;
            for (var i = 0; i < item.lyrics.length; i++){
                if (themes[0].wordbank.includes(item.lyrics[i])){
                    count = count + 1;
                }
            }
            return count;
        }).reduce(add,0);
        
        obj.lifestyle = 0.01*element.map(function(item){
            var count = 0;
            for (var i = 0; i < item.lyrics.length; i++){
                if (themes[1].wordbank.includes(item.lyrics[i])){
                    count = count + 1;
                }
            }
            return count;
        }).reduce(add,0);

        obj.party = 0.01*element.map(function(item){
            var count = 0;
            for (var i = 0; i < item.lyrics.length; i++){
                if (themes[2].wordbank.includes(item.lyrics[i])){
                    count = count + 1;
                }
            }
            return count;
        }).reduce(add,0);

        obj.love = 0.01*element.map(function(item){
            var count = 0;
            for (var i = 0; i < item.lyrics.length; i++){
                if (themes[3].wordbank.includes(item.lyrics[i])){
                    count = count + 1;
                }
            }
            return count;
        }).reduce(add,0);

        obj.religion = 0.01*element.map(function(item){
            var count = 0;
            for (var i = 0; i < item.lyrics.length; i++){
                if (themes[4].wordbank.includes(item.lyrics[i])){
                    count = count + 1;
                }
            }
            return count;
        }).reduce(add,0);

        obj.death = 0.01*element.map(function(item){
            var count = 0;
            for (var i = 0; i < item.lyrics.length; i++){
                if (themes[5].wordbank.includes(item.lyrics[i])){
                    count = count + 1;
                }
            }
            return count;
        }).reduce(add,0);

        obj.count = obj.death + obj.religion + obj.lifestyle + obj.music + obj.party + obj.love;

        return obj;

    };
    
    return data.map(themeCount);
};
module.exports = topics;