require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const user = require("./Neo4jAPI/User");
const auth = require("./auth");
const driver = require("./Neo4jAPI/config");
const team = require("./Neo4jAPI/Team");
const ground = require("./Neo4jAPI/Ground");
const utils = require("./Neo4jAPI/utils/distance_utils");
const { DateTime } = require("neo4j-driver");
const sportUtils = require("./Neo4jAPI/utils/inital_sports");
const { session } = require("./Neo4jAPI/config");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Server is running on port 5000");
});



app.post("/register", async (req, res) => {
  var registerObj = {
    userId: req.body.userId,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    contact: req.body.contact,
  };

  var result = await user.createUser(registerObj);
  console.log(result);

  res.json({
    msg: "sucess",
  });
});

app.post("/login", async (req, res) => {


  var loginObj = {
    userId: req.body.userId,
    password: req.body.password,
  };

  var msg = {
    msg: "Not found",
  };

  const session = driver.session();

  session
    .run("MATCH (u: User {userId:$userId}) RETURN u", loginObj)
    .then((result) => {
      if (result.records.length <= 0) {
        res.json(msg);
        throw {
          user: "not found",
          status: 400,
        };
      } else {
        if (
          loginObj.password === result.records[0].get(0).properties.password
        ) {
          const token = jwt.sign(
            result.records[0].get(0).properties,
            process.env.SECRET_KEY
          );
          console.log(result.records[0].get(0).properties);
          res.json({ user: result.records[0].get(0).properties, token: token });
        } else {
          console.log("Invalid Credetials");
          res.json(msg);
          throw {
            password: "not found",
            status: 400,
          };
        }
      }

      
    })
    .then(() => {
      ground.addGround();
    })
    .then((res) => {
      console.log(res);
    })
    // .then(() => {
    //   sportUtils.setSports();
    // })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      session.close();
    });
});

app.get("/get-interested-sports",  (req, res) => {
  const userId = {
    userId: req.query.userId,
  };

  
    let session = driver.session();
     session.run(
      "MATCH(u:User{userId: $userId})-[:IS_INTERESTED_IN]->(s:IndividualSport) RETURN s",
      userId
    ).then((result)=>{
        console.log(result);
        var arr=[];
        for(var i=0;i<result.records.length;i++)
        {
          arr.push(result.records[i].get(0).properties.name);
        }
        console.log(arr);
        res.json({
          interests:arr
        })
    }).
    catch((err)=>{
      console.log(err);
    }).finally(()=>{
      session.close();
    })

  
});

app.post("/set-interested-sports",  (req, res) => {
 
   var arr=req.body.arr;
  var userId=req.body.userId;
console.log(arr);
  var session1=driver.session();
 
  session1.run("MATCH(u:User{userId:$userId})-[r:IS_INTERESTED_IN]->(n) DELETE r",{userId:userId}).then((result)=>{
    console.log(result);
  }).catch(err=>{
    console.log(err);
  }).then(()=>{
  
    let session2 = driver.session();

   var query = "MERGE(u:User{userId:$userId}) ";

    for(var i =0;i<arr.length;i++)
    {  
      if(arr[i]==="Chess")
      {
        query+="MERGE(t1:IndividualSport{name:'Chess'}) MERGE(u)-[:IS_INTERESTED_IN]->(t1) ";
      }
      if(arr[i]==="Tennis")
      {
        query+="MERGE(t2:IndividualSport{name:'Tennis'}) MERGE(u)-[:IS_INTERESTED_IN]->(t2) ";
      }
      if(arr[i]==="Badminton")
      {
        query+="MERGE(t3:IndividualSport{name:'Badminton'}) MERGE(u)-[:IS_INTERESTED_IN]->(t3) ";
      }
      if(arr[i]==="Pool")
      {
        query+="MERGE(t4:IndividualSport{name:'Pool'}) MERGE(u)-[:IS_INTERESTED_IN]->(t4) ";
      }


      }
      console.log(query);

      session2.run(query,{userId:userId}).then((res)=>{
        console.log("inner success");
      }).catch(err=>{console.log(err);}).finally(()=>{
        session2.close();
      })
  
  
  
    }).finally(()=>{
    session1.close();
    res.json({
      msg:"success"
    })
  })

 
});

//Create team

app.post("/create-team", async (req, res) => {
  console.log(req.body);
  var teamInfo = {
    name: req.body.teamName,
    captain: req.body.captain,
    sports: req.body.sport,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  team
    .createTeam(teamInfo)
    .then((result) => {
      res.json({ msg: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//

app.post("/team-search", function (req, res) {
  var teamSearchObj = {
    teamName: req.body.teamName,
    sport: req.body.sport,
  };

  const session = driver.session();

  if (teamSearchObj.teamName != null) {
    session
      .run(
        "MATCH(t:Team {name: $teamName,sports:$sport}) RETURN t",
        teamSearchObj
      )
      .then((result) => {
        console.log(result.records.length);
        if (result.records.length > 0) {
          res.json({
            team: result.records[0].get(0).properties,
            msg: "Found",
          });
        } else {
          res.json({
            msg: "Not Found",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        session.close();
      });
  }
});

app.get("/get-nearby-grounds", async (req, res) => {
  let userLocation = {
    lat: parseFloat(req.query.latitude),
    long: parseFloat(req.query.longitude),
  };
  console.log(userLocation);
  let nearbyGrounds = [];
  const session = driver.session();
  try {
    let result = await session.run("MATCH(t:Turf) RETURN t");

    result.records.map((record) => {
      let groundLongitude = record.get(0).properties.longitude;
      let groundLatitude = record.get(0).properties.latitude;
      groundLongitude = parseFloat(groundLongitude);
      groundLatitude = parseFloat(groundLatitude);
      var dist = utils.getDistanceFromLatLonInKm(
        groundLatitude,
        groundLongitude,
        userLocation.lat,
        userLocation.long
      );
      if (dist <= 10) {
        nearbyGrounds.push({
                  Name: record.get(0).properties.name,
                  Address: record.get(0).properties.address,
                  Contact: record.get(0).properties.contact,
                  Ratings: record.get(0).properties.ratings,
                  Latitude: parseFloat(record.get(0).properties.latitude),
                  Longitude: parseFloat(record.get(0).properties.longitude),
                   });
          }
      });

    await session.close();
  } catch (err) {
    console.log(err);
  }
  res.json(nearbyGrounds);
});

//-------------------------------------------------------------------------------------------------------//

//JOIN TEAMS

app.post("/join-team", async function (req, res) {
  console.log(req.body);
  var obj = {
    userId: req.body.userId,
    teamName: req.body.teamName,
    sport: req.body.sport,
  };

  const session = driver.session();
  session
    .run(
      "MERGE(u:User {userId:$userId}) MERGE(t:Team{name:$teamName,sports:$sport}) MERGE(u)-[:IS_PLAYER_OF]->(t)",
      obj
    ).then((result) => {
     console.log(result);
     res.json({
       msg:"success"
     }); 
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      session.close();
    });
});

app.get("/team-info",  function (req, res) {
  var obj = { userId: req.query.userId };
  const session = driver.session();

   session.run(
      "MATCH(a:User{userId:$userId})-[:IS_PLAYER_OF]->(t:Team) RETURN t",
      obj
    ).then((result)=>{


      if (result.records.length <= 0) {
        res.json({
          hasTeam: false,
        });
      } else {
        console.log(result.records[0].get(0).properties);
        var arr = [];
        for (let i = 0; i < result.records.length; i++) {
          arr.push(result.records[i].get(0).properties);
        }
        res.json({
          hasTeam: true,
          teams: arr,
        });
      }

    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      session.close()
    });
    
});

//NEARBY TEAMS

app.post("/get-nearby-teams", async (req, res) => {
  let teamInfo = {
    captain:req.body.captain,
    teamName:req.body.team,
    sport: req.body.sport,
    latitude: parseFloat(req.body.latitude),
    longitude: parseFloat(req.body.longitude),
  };

  let session = driver.session();
  let nearbyTeams = [];
  try {
    let result = await session.run(
      "MATCH(t:Team{sports:$sport}) WHERE NOT (:User{userId:$captain})-[:IS_CAPTAIN_OF]->(t) RETURN t",
      teamInfo
    );

    if (result.records.length <= 0) {
      res.json({ msg: "No teams found" });
    } else {
      for (let index = 0; index < result.records.length; index++) {
        let teamLatitude = parseFloat(
          result.records[index].get(0).properties.latitude
        );
        let teamLongitude = parseFloat(
          result.records[index].get(0).properties.longitude
        );

        let dist = utils.getDistanceFromLatLonInKm(
          teamLatitude,
          teamLongitude,
          teamInfo.latitude,
          teamInfo.longitude
        );
        if (dist <= 5) {
          nearbyTeams.push(result.records[index].get(0).properties);
        }
      }

      res.json({ teams: nearbyTeams, msg: "Found teams" });
    }
  } catch (err) {
    console.log(err);
  }
});

//NEARBY USERS

app.post("/nearby-individuals", (req, res) => {
  let userData = {
    userId: req.body.userId,
    sport:req.body.sport,
    latitude: parseFloat(req.body.latitude),
    longitude: parseFloat(req.body.longitude),
  };

  console.log(userData);
  let session = driver.session();
 
    session.run(
      "MATCH(u:User)-[:IS_INTERESTED_IN]->(s:IndividualSport{name:$sport}) WHERE u.userId <> $userId RETURN u",
      userData
    ).then((result)=>{
      console.log(result.records.length);
      if (result.records.length <= 0) {
        res.json({ msg: "No individuals found" });
      }
      else{
        var nearbyUsers=[];

        for (var i = 0; i < result.records.length; i++) {


         

          let userLatitude = result.records[i].get(0).properties.latitude;
          let userLongitude = result.records[i].get(0).properties.longitude;
          
          

          let dist = utils.getDistanceFromLatLonInKm(
            userData.latitude,
            userData.longitude,
            userLatitude,
            userLongitude
          );
    
          if (dist < 5) {
            nearbyUsers.push(result.records[i].get(0).properties);
          }
         
        
        }
        res.json({ nearbyUsers: nearbyUsers });


      }

    }).catch((err)=>{

    }).finally(()=>{
      session.close();
    });

    
   

    
   
   
  }
);

app.get("/captain-teams-search",function(req,res)
{

  var obj={
    userId:req.query.userId,
};

const session = driver.session();
session.run('MATCH(n:User{userId:$userId})-[:IS_CAPTAIN_OF]->(t:Team) RETURN t',obj).then((result)=>{
  if(result.records.length<=0)
  {
    res.json({
      isCaptain:false
    });
  }
  else{
    
     var FootArr=[];
     var CrickArr=[];
     var VollArr=[];
     for(let i=0;i<result.records.length;i++)
     {
      console.log(result.records[i].get(0).properties);
       if(result.records[i].get(0).properties.sports=="Football")
       {FootArr.push(result.records[i].get(0).properties.name);}
       else if(result.records[i].get(0).properties.sports=="Cricket")
       {
         CrickArr.push(result.records[i].get(0).properties.name);
       }
       else if(result.records[i].get(0).properties.sports=="Volleyball")
       {
        VollArr.push(result.records[i].get(0).properties.name);
      }

     

     }



      res.json(
        {
          isCaptain:true,
          Football:FootArr,
          Cricket:CrickArr,
          Volleyball:VollArr

        }
      );
    
  }

})
.catch((err)=>{
  console.log(err);
}).finally(()=>{
  session.close();
});

});




app.get("/profile", auth, function (req, res) {
  res.json({
    userData: req.user,
    msg: "This is your authorized profile",
  });
});

//REQUEST

app.post("/send-request",function(req,res)
{

  var sender;
  if(req.body.type==="individual")
  {
    sender=req.body.userId;
  }
  else{
    sender=req.body.sender
  }

  var obj={

    sender:sender,
    opponent:req.body.opponent,
    sport:req.body.sport,
    date:req.body.date,
    time:req.body.time,
    type:req.body.type
  }

  console.log(obj);
let session = driver.session();

session.run("MERGE(n:Request{date:date($date),sender:$sender,receiver:$opponent,sports:$sport,time:time($time),type:$type}) RETURN n",obj)
.then((result)=>{
console.log(result);
res.json({
  msg:"success"
})
}).catch((err)=>{
console.log(err)
})
.finally(()=>{
session.close();
});

  console.log(obj);

}


);

// app.get("/get-request-individual")
// {

//   var obj={
//     userId:req.query.userId,
   
//   }

  

// }





app.get("/get-request",function(req,res)
{

var obj={
  userId:req.query.userId,
 
}

var teamArr=req.query.teamArr
inString="[";
for(var i=0;i<teamArr.length;i++)
{
    inString+="'"+teamArr[i];
    if(i==teamArr.length-1)
    {
      inString+="']";
    }
    else{
      inString+="',"
    }

}
console.log(teamArr,"627");
console.log(inString,"627");

let session1 = driver.session();

session1.run("MATCH(r:Request) WHERE r.receiver IN "+inString+" RETURN r,id(r)").then(
  
(resultout)=>{

var requests=[] ;
if(resultout.records.length>0)
 {
    for(let i=0;i<resultout.records.length;i++)
    {
      requests.push({...resultout.records[i].get(0).properties,id:resultout.records[i].get(1).low});
    }
  }
 
  let session2 =driver.session();
   
  session2.run("MATCH(r:Request{receiver:$userId,type:'individual'}) RETURN r,id(r)",obj)
  .then((resultin)=>{
    // console.log(resultin.records);
    if(resultin.records.length>0)
    {
      // console.log(resultin.records[0].get(0))
      for(var j=0;j<resultin.records.length;j++)
      {
        requests.push({...resultin.records[j].get(0).properties,id:resultin.records[j].get(1).low});
      }

    }

   res.json({
     requests:requests
   });



  }).catch((err)=>{
      console.log(err);
  }).
  finally(()=>
  {
    session2.close();
  });

  

})
.catch((err)=>{
console.log(err);
}).finally(()=>{session1.close()});


});


//MATCH


app.post("/request-accept",function (req,res) {
let session1 = driver.session();


var obj={
id:req.body.id,
sender:req.body.sender,
receiver:req.body.receiver,
  time:req.body.time,
  date:req.body.date,
  type:req.body.type,
  sports:req.body.sports
}

session1.run("CREATE(m:ScheduledMatch{type:$type,sports:$sports,time:time($time),date:date($date),sender:$sender,receiver:$receiver}) RETURN m",obj)
.then((resultout)=>{

let session2=driver.session();

session2.run("MATCH(n) WHERE id(n)=$id DELETE n",obj)
.then((resultin)=>{

})
.catch(err=>{
  console.log(err);
})
.finally(()=>
{
session2.close();
}
);


})
.catch((err)=>{
  console.log(err);
})
.finally(()=>{

  session1.close();
});


});

app.post("/request-decline",function (req,res) {
  
  let session = driver.session();
var obj={
id:req.body.id,
}
  session.run("MATCH(n) WHERE id(n)=$id DELETE n",obj)
  .then((result)=>{
  res.json({
    msg:"success"
  })
  })
  .catch((err)=>{
    console.log(err);
  })
  .finally(()=>{
  
    session.close();
  })
  


});



app.get("/schedule-match", function (req, res)  {
  let obj = {
    userId:req.query.userId,
    
  };
  var teamArr=req.query.teams;
  var inString="[";

  for(var i=0;i<teamArr.length;i++)
  {
      inString+="'"+teamArr[i];
      if(i==teamArr.length-1)
      {
        inString+="']";
      }
      else{
        inString+="',"
      }
  
  }
 

  let session1 = driver.session();
 
  //Individual matches
     session1.run(
      "MATCH(r:ScheduledMatch) WHERE r.sender=$userId OR r.receiver=$userId return r",
      obj
    )
    .then((result)=>{
      var matches=[];
      if(result.records.length>0)
      {
        for(var i=0;i<result.records.length;i++)
        {
          matches.push(result.records[i].get(0).properties);
        }
      }

      let session2=driver.session();


      session2.run("MATCH(r:ScheduledMatch) WHERE r.sender IN "+inString+" OR r.receiver IN "+inString+" RETURN r")
      .then((result)=>{
        if(result.records.length>0)
        {
          console.log(result.records);
          for(var i=0;i<result.records.length;i++)
          {
            matches.push(result.records[i].get(0).properties);
          }
        }

        res.json({
          matches:matches
        })
      }).catch((err)=>{
        console.log(err);
      }).finally(()=>{
        session2.close();
      })

      
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      session1.close();
    })
    ;
  
  
  }
   
);


//Exit From Team

app.post("/exit-team",function(req,res)
{

var obj={
  userId:req.body.userId,
  name:req.body.name,
  sports:req.body.sports,
  captain:req.body.captain

};

console.log(obj);  
let session1= driver.session();
session1
.run("MATCH(n:User{userId:$userId})-[r:IS_CAPTAIN_OF]->(t:Team{name:$name,sports:$sports}) DETACH DELETE t",obj
)
.then((resultout)=>{
console.log(resultout);
  let session2=driver.session();
  session2.run("MATCH(n:User{userId:$userId})-[r:IS_PLAYER_OF]->(t:Team{name:$name,sports:$sports,captain:$captain}) DELETE r",obj)
  .then((resultin)=>{
console.log(resultin);
res.json({
  msg:"Exit SucessFull"
})
  })
  .catch((err)=>{
    console.log(err);
  })
  .finally(()=>{
    session2.close();
  })

})
.catch((err)=>{
  console.log(err);
})
.finally(()=>{
  session1.close()
})



});

//ALL PLAYERS

app.post("/team-details",function (req,res) {

  var obj={
    name:req.body.name,
    captain:req.body.captain,
    sports:req.body.sports
  }

let session=driver.session();
session.run("MATCH(u:User)-[:IS_PLAYER_OF]->(t:Team{name:$name,sports:$sports,captain:$captain}) RETURN u",obj)
.then((result)=>{
var players=[];
for(var i=0;i<result.records.length;i++){
  players.push(result.records[i].get(0).properties);
  
}
res.json({
  players:players
});
}
)
.catch((err)=>{console.log(err);})
.finally(()=>{session.close()})
  
})


app.listen(5000,function()
{
console.log("Server running on port 5000");
});


