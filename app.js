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
      if (dist < 2) {
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

app.post("/nearby-individuals", async (req, res) => {
  let userData = {
    userId: req.body.userId,
    latitude: parseFloat(req.body.latitude),
    longitude: parseFloat(req.body.longitude),
  };

  let session = driver.session();
  let nearbyUsers = [];
  try {
    let result = await session.run(
      "MATCH(u:User) WHERE u.userId <> $userId RETURN u",
      userData
    );

    for (let i = 0; i < result.records.length; i++) {
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
    await session.close();

    res.json({ nearbyUsers: nearbyUsers });
  } catch (err) {
    console.log(err);
  }
});

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
          VolleyBall:VollArr

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

//MATCH

app.post("/schedule-match", async (req, res) => {
  let match = {
    opponent: req.body.opponent,
    host: req.body.host,
    date: DateTime(req.body.date),
    time: req.body.time,
  };

  let session = driver.session();
  try {
    let result = await session.run(
      "CREATE (m:Match{opponent: $opponent, host: $host,date: $date, time: $time}) RETURN m",
      match
    );

    console.log(result);
    await session.close();

    res.json({ msg: "Match has been scheduled" });
  } catch (err) {
    console.log(err);
  }
});


app.listen(5000,function()
{
console.log("Server running on port 5000");
});


