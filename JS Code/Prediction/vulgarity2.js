var vulgar = {};
var vulgarWords = ['nigger','nigga','niggas','fuck','shit','dick', 'bitch', 'cock', 'damn', 'ass', 'cunt', 'whore', 'pussy', 'slut', 'fucking', 'piss', 'pissed', 'bullshit'];

vulgar.one = function(data){

    var add = function(a, b){
        return a + b;
    };  
    
    var vulgarCount = function(element){
        var obj = {};
        obj.year = element[0].year;
        obj.vulgar = [].concat.apply([], element.map(function(item){
            var count = 0;
            for (var i = 0; i < item.lyrics.length; i++){
                if (vulgarWords.includes(item.lyrics[i])){
                    count = count + 1;
                }
            }
            return count/76;
                
        }));
  
        
        return obj;  
    };

    return [].concat.apply([], data.map(vulgarCount));
};

module.exports = vulgar;
