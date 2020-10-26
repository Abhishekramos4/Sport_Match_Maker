const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
const neo4j=require('neo4j-driver');
const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// const driver = neo4j.driver("bolt://localhost:7687",neo4j.auth.basic("neo4j","1234"));
// const session = driver.session();

// var result  = session.run()
app.get("/",function(req,res){
res.send("Server is running on port 5000");
});

var dummyUsers=[];
app.post("/dummy-register",function(req,res){

  
   console.log(req.body);
   dummyUsers.push(req.body);
   console.log(dummyUsers);

});


app.listen(5000,function(){
   console.log("Server running on port 5000"); 
})
