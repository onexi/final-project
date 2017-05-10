var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var shelljs = require('shelljs/global');
var csvWriter = require('csv-write-stream');
var writer = csvWriter();

//we used Scrapy to parse all the urls of posts by zip code in Craigilist 

exercise.one = function(){
   // push all the search results of each zip code into one specific json file
   var files = fs.readdirSync('./data_cheerio/');
   // console.log(files);
   var data = [];
   files.forEach(function(element){
      if (element != '.DS_Store'){
         body = fs.readFileSync('./data_cheerio/'+element,'utf8');
         data.push(body);
         // console.log(data.title);
      };
   });
   fs.writeFileSync('./data_cheerio/all.json',data);
};

exercise.two = function(){
   //use python to filter data and combine data 
};

exercise.three = function(){
   // complete links prefix
   var newArray = [];
   // var data = exercise.two();
   data.forEach(function(element){
      url = '"https://boston.craigslist.org/';
      old = element.link[0];
      element.link[0] = url + old + '"';
      newArray.push(element.link);
   });
   //console.log(newArray);
   fs.writeFileSync('./link/02163.js',newArray);
};

 
exercise.four = function(){
   //curl all the content from the website
    var urls = fs.readFileSync('./link/02163.js','utf8');
    var split = urls.split(',');
    //console.log(split[1]);
    split.forEach(function(element,i) {
        var name = '02163_'+ i + '.html';
        var command = 'curl ' + element + ' > link/02163/'+ name;
        // console.log(command);
        exec(command);
    });
};


exercise.five = function(){
    //store the content into a local drive
    var files = fs.readdirSync('./link/02144');
    var content = [];
    files.forEach(function(name) {
        if (name != '02144.txt' || '.DS_Store') {
            var body = fs.readFileSync('./link/02144/' + name, 'utf8');
            content.push(body);
        };
    });
    fs.writeFileSync('./link/02144/02144.js', content);
};

exercise.six = function(){
   // combine the information from individual web page into one js file 
    var files = fs.readdirSync('./website_info');
    var content = [];
    files.forEach(function(name) {
        if (name != '.DS_Store') {
            var body = fs.readFileSync('./website_info/' + name , 'utf8');
            content.push(body);
        };
    });
    fs.writeFileSync('./website_info/website_info.js',content[1]);
   //  fs.writeFileSync('./website_info/website_info.js', content);
   //  var contents = fs.readFileSync('./website_info/website_info.js','utf8');
   //  var split = contents.split('<!DOCTYPE html>');
   //  console.log(contents[1]);
    //fs.writeFileSync('./website_info/website_info_split.js', contents);
};

exercise.seven = function(){
   // extract useful information from web data by structure 
    var files = fs.readdirSync('./link/02163/');
    var info = [];
    files.forEach(function(name){
       if (name != '.DS_Store') {
          var text = fs.readFileSync('./link/02163/' + name,'utf8');
          $ = cheerio.load(text);
          var title = $('title').text();
          var link = $('title').next().attr('href');
          var description = $('title').next().next().attr('content');
          var price = $('span.price').text();
          var bedr = $('p.attrgroup').children().eq(0).text();
          var area = $('p.attrgroup').children().eq(1).text();
          var avail_time = $('p.attrgroup').children().eq(2).text();
          var lat = $('div.mapbox').children().attr('data-latitude');
          var long = $('div.mapbox').children().attr('data-longitude');
          var post_time = $('div.postinginfos').children().next().children().eq(0).text();
          var update_time = $('div.postinginfos').children().next().children().eq(1).text();
       };
       var format = {
          "title":title,
          "link":link,
          "description":description,
          "price":price,
          "bedroom": bedr,
          "area": area,
          "latitude": Number(lat),
          "longitude":Number(long),
          "posing_time": post_time,
          "update_time": update_time,
          "available_time": avail_time
       };
       info.push(format);
    });
    info.splice(0,1);
    //console.log(info);
    fs.writeFileSync('./data_cheerio/02163.js',JSON.stringify(info));
};

//we filtered the combined data again using python

exercise.eight = function(){
   //we transformed the .js data into csv because the visualization tool Carto reads csv
   var data = require('./data_cheerio/all_filtered.js');
   var writer = csvWriter({ headers: ["title", "link","description","price","# of bedroom","area","latitude","longtitude","post time","update time","available time"]});
   writer.pipe(fs.createWriteStream('./data_cheerio/out.csv'));
   for(var i = 0; i < data.length; i++){
      write.write([data[i].title,data[i].link,data[i].description,data[i].price,data[i].bedroom,data[i].area,data[i].latitude,data[i].longitude,data[i].posting_time,data[i].update_time, data[i].available_time]);
   };
   writer.write([]);
   writer.end();
};

//Next, because we wanted to map the posts, we deleted the posts with no longtitude/lattitude available 
//and used what left (desireable data) to extract keywords in description. 

exercise.nine = function(){
    //we extracted all descriptions and perform word count
    var data = require('./all/filtered_namechange.js');
    var desc = '';
    var descarray = []; 
    for (var i=0; i<data.length;i++){
        desc += data[i].description;
    }
    descarray.push(desc); 
    return descarray;
 };


exercise.ten= function(){
    //filter out common owrds 
    var desc = exercise.ten();
    
    var commonWords = ['and', 'in', 'a', 'an', 'the','of', 'for','to','into','some','any','with','are','is','was','it','this','There','The','This','but','and','ID:','ID#','1','2','3','4','5','6','7','8','9','0','-','--','!',':','?','[',']','{','}','&','/',','];

    var descs = desc.map(function(word) {
    var splitArray = word.split(" ");
    var filteredArray = splitArray.filter(function(word) {
        if (commonWords.includes(word)) return false;
        else return true;
    });

    return filteredArray;
});
    return descs[0];
};

exercise.eleven = function(){
    //push all words into one array
    var descs=exercise.eleven();
     
    var words=[];
    for (var i=0; i< descs.length; i++){
        words.push(descs[i]);
        } 
    
    return words;
};

exercise.twelve= function(){
    //generate keywords and word count
    var list = exercise.twelve();
    var count = list.reduce (function(previous, current){
        if (current in previous) {
            previous[current] +=1;
        }
        else{
            previous[current] =1;
        }
       
       fs.writeFileSync('wordcount.js', JSON.stringify(count));
       return count;
});
};

module.exports = exercise;