require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
const jwt = require('jsonwebtoken');
const app= express();
const user = require('./Neo4jAPI/User');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.get("/",function(req,res){
res.send("Server is running on port 5000");
});


var dummyUsers=[{
   userId:"ab12",
   fname:"Abhishek",
   lname:"Kekane",
   email:"abhishekkekane@gmail.com",
   latitude:19.1646,
   longitude:72.8493,
   password:"1234",
   teamName:""

},{
   userId:"sr4",
   fname:"Sergio",
   lname:"Ramos",
   email:"sergioramos@gmail.com",
   latitude:19.113646,
   longitude:72.869736,
   password:"1234",
   teamName:"Real Madrid",
   isCaptain:true


},
{
   userId:"eh7",
   fname:"Eden",
   lname:"Hazard",
   email:"edenhazard@gmail.com",
   latitude:19.113646,
   longitude:72.869736,
   password:"1234",
   teamName:"Real Madrid",
   isCaptain:false
}

];

var dummyTeams=[{
teamName:"Real Madrid",
captain:"Sergio Ramos",
sport:"Football",
players:["sr4","eh7"],
limit:25
},


]

app.post("/register",function(req,res) {



   var registerObj =  { userId: req.body.userId,
      fname:req.body.fname,
      lname:req.body.lname,
      email:req.body.email,
      password:req.body.password,
      latitude:req.body.latitude,
      longitude:req.body.longitude
   }
   
   dummyUsers.push(registerObj);
   console.log(dummyUsers);
   // user.createUser(obj).then(
   //    result=>{
   //       console.log(result);
   //    }
   // );
   
   
   res.json({
     msg:"sucess" 
   });

});

app.post("/login",function(req,res)
{

//Dummy Users :


var loginObj={
   userId:req.body.userId,
   password:req.body.password
}

var foundUser=dummyUsers.find(user=>user.userId==loginObj.userId);
if(!foundUser) {res.json({msg:"Please register first"});}
else if(foundUser.password!=loginObj.password)
{
   res.json({msg:"Invalid Credentials"});
   
}
else{

   const token=jwt.sign({foundUser},process.env.SECRET_KEY);
   res.json({user:foundUser,token:token});
}



   
});

app.get('/team-info',function(req,res){

   var user = dummyUsers[1];
   var obj={
   hasTeam:false,
   teamName:""

   }

   if(user.teamName!==""){
      obj.hasTeam=true;
      obj.teamName=user.teamName;
   }
   res.json({obj});

}
);

app.post('/has-team',function(req,res){
   var user = dummyUsers[1];
 
  var foundTeam = dummyTeams.find((team)=>team==user.teamName);
  var players=[];
  foundTeam.players.forEach((player)=>{

   var foundPlayer=dummyUsers.find((user)=>user.userId==player);
   players.push(foundPlayer);



  });
  res.json({
      teamName:foundTeam.teamName,
      players:players
  });


});

app.post('/team-search',function(req,res){

   var teamName=req.body.teamName;
   var sport =req.body.sport;
var obj={msg:"",
players:[]
}
   var foundTeam = dummyTeams.find(team=>team.teamName==teamName && team.sport == sport);
   if(foundTeam==null) {
      obj.msg="No Team Found";
   }
   else{
      var i;
      for(i=0;i<foundTeam.players.length;i++)
      {
        
         var playerinfo = dummyUsers.find(user=>user.userId==foundTeam.players[i]);
         obj.players.push(playerinfo);
      }
      obj.msg="Team Found"
   }
   res.json(obj);
   
});


app.listen(5000,function(){
   console.log("Server running on port 5000"); 
})
