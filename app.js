require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
const jwt = require('jsonwebtoken');
const app= express();
const user = require('./Neo4jAPI/User');
const auth = require('./auth');
const driver = require("./Neo4jAPI/config");
const team = require("./Neo4jAPI/Team");





app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get("/",function(req,res){
res.send("Server is running on port 5000");
});


// var dummyUsers=[{
//    userId:"ab12",
//    fname:"Abhishek",
//    lname:"Kekane",
//    email:"abhishekkekane@gmail.com",
//    latitude:19.1646,
//    longitude:72.8493,
//    password:"1234",
//    teams:[]

// },{
//    userId:"sr4",
//    fname:"Sergio",
//    lname:"Ramos",
//    email:"sergioramos@gmail.com",
//    latitude:19.113646,
//    longitude:72.869736,
//    password:"1234",
//    teams:["Real Madrid","Mumbai Indians"],
   


// },{
//    userId:"rs45",
//    fname:"Rohit",
//    lname:"Sharma",
//    email:"rs45@gmail.com",
//    latitude:19.113646,
//    longitude:72.869736,
//    password:"1234",
//    teams:["Real Madrid","Mumbai Indians"],
   


// },

// {
//    userId:"eh7",
//    fname:"Eden",
//    lname:"Hazard",
//    email:"edenhazard@gmail.com",
//    latitude:19.113646,
//    longitude:72.869736,
//    password:"1234",
//    teams:["Real Madrid"],
  
// }

// ];

// var dummyTeams=[{
// teamName:"Real Madrid",
// captain:"sr4",
// sport:"Football",
// players:[{
//    userId:"sr4",
//    fname:"Sergio",
//    lname:"Ramos",
//    email:"sergioramos@gmail.com",
//    latitude:19.113646,
//    longitude:72.869736,
//    password:"1234",
//    teams:["Real Madrid","Mumbai Indians"],
   


// },
// {
//    userId:"eh7",
//    fname:"Eden",
//    lname:"Hazard",
//    email:"edenhazard@gmail.com",
//    latitude:19.113646,
//    longitude:72.869736,
//    password:"1234",
//    teams:["Real Madrid"],
  
// }


// ],
// limit:25
// },
// {
//    teamName:"Mumbai Indians",
//    captain:"rs45",
//    sport:"Cricket",
//    players:[{
//       userId:"sr4",
//       fname:"Sergio",
//       lname:"Ramos",
//       email:"sergioramos@gmail.com",
//       latitude:19.113646,
//       longitude:72.869736,
//       password:"1234",
//       teams:["Real Madrid","Mumbai Indians"],
      
   
   
//    },
//    {
//       userId:"rs45",
//       fname:"Rohit",
//       lname:"Sharma",
//       email:"rs45@gmail.com",
//       latitude:19.113646,
//       longitude:72.869736,
//       password:"1234",
//       teams:["Real Madrid","Mumbai Indians"],
      
   
   
//    }],
//    limit:25


// }


// ]

app.post("/register",async (req,res) => {



   var registerObj =  { userId: req.body.userId,
      fname:req.body.fname,
      lname:req.body.lname,
      email:req.body.email,
      password:req.body.password,
      latitude:req.body.latitude,
      longitude:req.body.longitude
   }
   
   // dummyUsers.push(registerObj);
   // console.log(dummyUsers);
   var result = await user.createUser(registerObj)
   console.log(result);
   
   
   res.json({
     msg:"sucess" 
   });

});

app.post("/login",async (req,res) => 
{

//Dummy Users :


var loginObj={
   userId:req.body.userId,
   password:req.body.password
}

const session = driver.session();

session
  .run("MATCH (u: User {userId:$userId}) RETURN u", loginObj)
  .then((result) => {
    console.log(result.records[0].get(0));
    if (loginObj.password === result.records[0].get(0).properties.password) {
         const token = jwt.sign(
           result.records[0].get(0).properties,
           process.env.SECRET_KEY
         );
         res.json({ user: result.records[0].get(0).properties, token: token });
    }else{
       console.log("Invalid Credetials");
       throw {
          password : "not found",
          status : 400
       }
    }
    // return (response);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    session.close();
  });




   
});

app.post('/create-team', async (req,res) => {
   var teamInfo = {
      name : req.body.name,
      players : req.body.players,
      captain : req.body.captain,
      sports : req.body.sports,
   }

   var result = await team.createTeam(teamInfo);


});

app.get('/team-info',function(req,res){

   var user = dummyUsers[1];
   var obj={
   hasTeam:false,
   teams:[]

   }

   if(user.teams.length!==0)
   {
      obj.hasTeam=true;
      
   var i;
      for(i=0;i<user.teams.length;i++)
      {
         var foundteam=dummyTeams.find((team)=>user.teams[i]==team.teamName);
         obj.teams.push(foundteam);
      }
     
   
   res.json(obj);

}
}
);


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

app.get('/profile',auth,function(req,res)
{
   console.log(req.headers);
   console.log(req.user)
   res.json({
      msg:'This is your authorized profile'
   })
});

app.listen(5000,function(){
   console.log("Server running on port 5000"); 
})
