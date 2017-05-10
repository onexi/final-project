var low = require('lowdb');
var digits= require ('./digits.js');

var exercise = {};
var window = window;

// delete data from previous runs
//var fs  = require ('fs');
//if (fs.existsSync(db)){ fs.unlink(db); }


//initialise databases JSON with lowdb
var db  = './public/radars.json';
var db2 = './public/userRadars.json';
var db3 = './public/placedRadars.json';
var db4 = './public/allRadars.json';

var db 	= low(db);
db.defaults({ radars:[] }).value();
var radars  = db.get('radars');
exercise.radars  = db.get('radars');

var db2 	= low(db2);
db2.defaults({ radars:[] }).value();
var userRadars  = db2.get('radars');
exercise.userRadars  = db2.get('radars');

var db3 	= low(db3);
db3.defaults({ radars:[] }).value();
var placedRadars  = db3.get('radars');
exercise.placedRadars  = db3.get('radars');

var db4 	= low(db4);
db4.defaults({ radars:[] }).value();
var allRadars  = db4.get('radars');



// populate database
exercise.populate = function(items){
    items.forEach(function(item){
        radars.push(item).last().value();
        allRadars.push(item).last().value();

    });
};

//-----------------------------------------
//  users: create, read, update, delete
//-----------------------------------------
exercise.count = function(){
    return radars;
};

//for default NEXRAD radrs
exercise.initRadarString = function(){
    return digits;
};

//for default NEXRAD radrs
exercise.initRadars = function(){

    var fullArray = digits.split(',');
    var objectArray= [];
   
    fullArray.forEach(function(item,i,wholething){
        
        
        var tempArray=[];
        var tempObject={};
        var tempID='';
        var tempLat='';
        var tempLong='';
        var tempEl=0;
        

        if ((i+1)%4==0){
		
            tempID=fullArray[i-3];
            tempLat=fullArray[i-1];
            tempLong=fullArray[i];
            tempEl=fullArray[i-2];


            tempObject= {Id: tempID, Elevation:tempEl, Lat: tempLat, Long: tempLong};            
            
            objectArray.push(tempObject);
                
        }
    });
    return objectArray;
};

// get user added radar types
exercise.getUserRadars = function  (){
    return userRadars.value();
};

// get placed radars
exercise.getPlacedRadars = function  (){
    return placedRadars.value();
};

// get radar using user id
exercise.getRadarById = function (id){
    var radar = radars.find({Id:id}).value();
    return radar; 
};

// add a new radar type to JSON
exercise.addRadar = function  (a,b,c,d,e,f,g,h,i,j){

    var radarObj= {Type: a, Power: b, Gt: c, Gr: d, DC: e, Freq: f, Sens: g, Sat: h, Txloss: i, Rxloss: j};
    userRadars.push(radarObj).last().value();
    console.log('added Type:'+ a);
    return exercise.getUserRadars();
};

//to assign spec to all default radars
exercise.assignDefaultRadarSpec = function  (a,b,c,d,e,f,g,h,i,j){

    radars.value().forEach(function(item){
        var radarObj={Lat: item.Lat, Long: item.Long, Elevation: item.Elevation, Id: item.Id, Type: a, Power: b, Gt: c, Gr: d, DC: e, Freq: f, Sens: g, Sat: h, Txloss: i, Rxloss: j};
        console.log(radarObj);
        allRadars.push(radarObj).last().value();
    });
    
};


//add to placed radar JSON
exercise.placeRadar = function  (a,b,c,d){
    var radarObj= {Lat:Number(b), Long:Number(c), Id: d, Type: userRadars.find({Type:a}).value().Type, Power: userRadars.find({Type:a}).value().Power, Gt: userRadars.find({Type:a}).value().Gt, Gr: userRadars.find({Type:a}).value().Gr, DC: userRadars.find({Type:a}).value().DC, Freq: userRadars.find({Type:a}).value().Freq, Sens: userRadars.find({Type:a}).value().Sens, Sat: userRadars.find({Type:a}).value().Sat, Txloss: userRadars.find({Type:a}).value().Txloss, Rxloss: userRadars.find({Type:a}).value().Rxloss};

    placedRadars.push(radarObj).last().value();
    allRadars.push(radarObj).last().value();

    console.log('placed radar:'+ d);
    return exercise.getPlacedRadars();
};


//change user created radars to string with option tags
exercise.getUserCreatedRadarsString = function(a){

    var strList = '';
    for (var z = 0; z < a.length; z++) {
        strList= strList+'<option value = "'+a.Id+'">'+a.Id+'</option>';
    }
    console.log(strList);
    return strList;
};



// delete user from db
exercise.deleteRadar = function (id){
    userRadars.remove({Type:id}).value();
    placedRadars.remove({Type:id}).value();
    allRadars.remove({Type:id}).value();
    console.log('deleted Type:'+ id);

    return exercise.getUserRadars();
};

exercise.deleteRadarLastPlaced = function(id){
placedRadars.remove({Id:id}).value();
allRadars.remove({Id:id}).value();
console.log('deleted placed sensor:'+ id);
};

module.exports = exercise;
