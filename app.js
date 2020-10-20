const express = require('express');
const bodyParser = require('body-parser');
const neo4j=require('neo4j-driver');
const app= express();

app.use(bodyParser.urlencoded({extended:false}));

const driver = neo4j.driver("bolt://localhost:7687",neo4j.auth.basic("neo4j","1234"));
// const session = driver.session();

// var result  = session.run()


app.listen(5000,function(){
   console.log("Server running on port 5000"); 
})
