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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
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

  // dummyUsers.push(registerObj);
  // console.log(dummyUsers);
  var result = await user.createUser(registerObj);
  console.log(result);

  res.json({
    msg: "sucess",
  });
});

app.post("/login", async (req, res) => {
  //Dummy Users :

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
        console.log(result.records[0]);
        if (
          loginObj.password === result.records[0].get(0).properties.password
        ) {
          const token = jwt.sign(
            result.records[0].get(0).properties,
            process.env.SECRET_KEY
          );
          res.json({ user: result.records[0].get(0).properties, token: token });
        } else {
          console.log("Invalid Credetials");
          res.json(msg);
          throw {
            password: "not Found",
            status: 400,
          };
        }
      }

      // return (response);
    })
    .then(() => {
      ground.addGround();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      session.close();
    });
});

app.post("/get-interested-sports", async (req, res) => {
  const userId = {
    userId: req.body.userId,
  };

  var interestedSports;
  try {
    let session = driver.session();
    interestedSports = await session.run(
      "MATCH(u:User{userId: $userId}) RETURN u.interestedSports",
      userId
    );
    await session.close();
  } catch (err) {
    console.log(err);
  }

  res.json(interestedSports);
});

app.post("/set-interested-sports", async (req, res) => {
  const data = {
    userId: req.body.userId,
    interestedSports: req.body.interestedSports,
  };

  try {
    let session = driver.session();
    interestedSports = await session.run(
      "MATCH(u:User{userId: $userId}) SET u.interestedSports = $interestedSports RETURN u.interestedSports",
      data
    );
    await session.close();
  } catch (err) {
    console.log(err);
  }

  res.json(data.interestedSports);
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
  var playersData = { name: req.body.teamName, players: req.body.players };
  var captainData = { name: req.body.teamName, captain: req.body.captain };

  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  })
    .then(() => {
      team.createTeam(teamInfo);
    })
    .then(() => {
      team.createCaptain(captainData);
    })
    .then(() => {
      team.createPlayers(playersData);
    })
    .then(() => {
      res.json({ msg: "success" });
    });

  // team.combined(teamInfo,captainData,playersData).then(
  //   ()=>{

  //     res.json({msg:"success"});
  //   }
  // );

  // console.log(createTeam,createCaptain,createPlayers);
  //  res.json({msg:"success"});
});

//

app.get("/team-info", function (req, res) {
  var user = dummyUsers[1];
  var obj = {
    hasTeam: false,
    teams: [],
  };

  if (user.teams.length !== 0) {
    obj.hasTeam = true;

    var i;
    for (i = 0; i < user.teams.length; i++) {
      var foundteam = dummyTeams.find((team) => user.teams[i] == team.teamName);
      obj.teams.push(foundteam);
    }

    res.json(obj);
  }
});

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
    // } else {
    //   session
    //     .run("MATCH(t:Team{sport: $sport})", teamSearchObj)
    //     .then((result) => {
    //       var teams = result.records[0].get(0).properties;
    //       if (teams != null) {
    //         obj.team = teams;
    //         obj.msg = "Team Found";
    //       } else {
    //         obj.msg = "Team Not Found";
    //       }
    //     })
    //     .finally(() => {
    //       session.close();
    //     });
  }

  //   var foundTeam = dummyTeams.find(
  //     (team) => team.teamName == teamName && team.sport == sport
  //   );
  //   if (foundTeam == null) {
  //     obj.msg = "No Team Found";
  //   } else {
  //     var i;
  //     for (i = 0; i < foundTeam.players.length; i++) {
  //       var playerinfo = dummyUsers.find(
  //         (user) => user.userId == foundTeam.players[i]
  //       );
  //       obj.players.push(playerinfo);
  //     }
  //     obj.msg = "Team Found";
  //   }
});

app.get("/get-nearby-grounds", async (req, res) => {
  let userLocation = {
    lat: parseFloat(req.query.latitude),
    long: parseFloat(req.query.longitude),
  };
  console.log(userLocation);
  let nearbyGrounds = [];
  const session = driver.session();
  try{
      let result = await session.run('MATCH(t:Turf) RETURN t');

      result.records.map(record => {
          let groundLongitude = record.get(0).properties.longitude;
          let groundLatitude = record.get(0).properties.latitude;
          groundLongitude = parseFloat(groundLongitude);
          groundLatitude = parseFloat(groundLatitude);
          var dist = getDistanceFromLatLonInKm(groundLatitude, groundLongitude, userLocation.lat, userLocation.long);
          if(dist < 5){
              nearbyGrounds.push({
                  Name: record.get(0).properties.name,
                  Address: record.get(0).properties.address,
                  Contact: record.get(0).properties.contact,
                  Ratings: record.get(0).properties.ratings,
                  Latitude: record.get(0).properties.latitude,
                  Longitude: record.get(0).properties.longitude
                  
              });
          }
      });

      await session.close();
  }
  catch(err) {
      console.log(err);
  }
  res.json(nearbyGrounds);
});

app.get("/profile", auth, function (req, res) {
  console.log(req.headers);
  console.log(req.user);
  res.json({
    userData: req.user.foundUser,
    msg: "This is your authorized profile",
  });
});

app.listen(5000, function () {
  console.log("Server running on port 5000");
});
