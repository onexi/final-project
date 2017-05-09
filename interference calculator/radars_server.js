var exercise = require('./radars_api.js');
var express  = require('express');
var app      = express();
var http = require('http');
var fs = require('fs');
var path    = require("path");



// populate database
var radars = exercise.initRadars();
//var placedRadars= exercise.getPlacedRadars();
//console.log(placedRadars);
//console.log(placedRadars);


//use once to populate default radars database
//exercise.populate(radars);

app.use( express.static( __dirname + '/client' ));
app.use( express.static( __dirname + '/public' ));

app.get('/', function(req, res){ 
    
});



//load main page
app.get('/radarmap', function(req, res){ 

    res.sendFile( path.join( __dirname, 'client', 'radars.html' ));

});

// number of radars
app.get('/count', function(req, res){ 
    res.send(exercise.count().length);
});


// get user added radars
app.get('/getUserRadars', function(req, res){ 
    res.send(exercise.getUserRadars());
});

// get placed radars
app.get('/getPlacedRadars', function(req, res){ 
    res.send(exercise.getPlacedRadars());
});

// get radar using  id
app.get('/getRadarById/:id', function(req, res){ 
    res.send(exercise.getRadarById(req.params.id));
});

// add a new rdr
app.get('/radarMap/addRadar/:sname/:power/:gt/:gr/:tau/:freq/:sens/:sat/:txloss/:rxloss', function(req, res){ 
        if (exercise.userRadars.find({Type:req.params.sname}).value()||exercise.radars.find({Id:req.params.sname}).value()){
            console.log('sensor type already exists');
            res.status(500).send('Sensor_type_exists');
            
        }else{

    exercise.addRadar(req.params.sname,req.params.power,req.params.gt,req.params.gr, req.params.tau,req.params.freq, req.params.sens, req.params.sat, req.params.txloss, req.params.rxloss)
    res.redirect('/radarMap');
        }



});

app.get('/radarMap/assignDefaultRadarSpec/:sname/:power/:gt/:gr/:tau/:freq/:sens/:sat/:txloss/:rxloss', function(req, res){ 
    

    exercise.assignDefaultRadarSpec(req.params.sname,req.params.power,req.params.gt,req.params.gr, req.params.tau,req.params.freq, req.params.sens, req.params.sat, req.params.txloss, req.params.rxloss)
    res.redirect('/radarMap');

});

// place a new rdr
app.get('/radarMap/placeRadar/:sname/:lat/:long', function(req, res){ 
    if (parseInt(req.params.lat)&&parseInt(req.params.long)){
        checkPlacedRadars(0);
        function checkPlacedRadars(Uid){
            if (exercise.placedRadars.find({Id:req.params.sname+'_'+Uid}).value()){
                checkPlacedRadars(Uid+1);
            }else{exercise.placeRadar(req.params.sname,req.params.lat,req.params.long,req.params.sname+'_'+Uid);}
        }
        res.redirect('/radarMap');
            
    }else{
        console.log('No Latitude/Longitude selected')
        res.status(500).send('No Latitude/Longitude selected') 
        }



});


// delete radar type
app.get('/radarMap/deleteRadar/:id', function(req, res){ 
    exercise.deleteRadar(req.params.id);
    res.redirect('/radarMap');
});

//delete placed radar (with highest ID)
app.get('/radarMap/deleteRadarPlaced/:id', function(req, res){ 

     if (exercise.placedRadars.find({Id:req.params.id+'_0'}).value()){
    checkPlacedRadars2(0);

    function checkPlacedRadars2(Uid){
    if (exercise.placedRadars.find({Id:req.params.id+'_'+Uid}).value()){
        checkPlacedRadars2(Uid+1);
    }else{
        Uid=Uid-1;
        exercise.deleteRadarLastPlaced(req.params.id+'_'+Uid);
    }
    }
    res.redirect('/radarMap');
     }else{
        console.log('No more sensors of selected type')
        res.status(500).send('No more sensors of selected type') 
     }
});

//delete placed radar (which is selected)
app.get('/radarMap/deleteSelectedPlacedRadar/:id', function(req, res){ 

    exercise.deleteRadarLastPlaced(req.params.id);
    res.redirect('/radarMap');

});

app.listen(3001,function(){
	console.log('Running on port 3001!');
});