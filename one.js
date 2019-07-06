var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1/mydb",function(err,db){
    if(!err)
        console.log("connected !");

        app.use(express.static('public'));

    app.get('/index.html',function(req,res){
        res.send(__dirname+"/"+"index.html");
    
    });
    app.get('/register.html',function(req,res){
        res.send(__dirname+"/"+"register.html");
    
    });
    app.get('/process_get',function(req,res){
        var newperson = req.query;
        var name = req.query['name'];
        var ph = req.query['ph'];
        var em = req.query['em'];
       

        db.collection('jpmc').insert({name : name, ph : ph, em : em});
        console.log("name : "+name+" phone : "+ph+" email id : "+em);
        res.end(JSON.stringify(newperson));


    });
    app.get('/display',function(req,res){
        

        db.collection('jpmc').find().toArray(function(err,docs){
            if(!err)
                res.status(200).json(docs);
        })
        


    });
   
        


   
    app.listen(5000);
});