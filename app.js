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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
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
    contact: req.body.contact
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
    msg: "Not found"
  };

  const session = driver.session();

  session
    .run("MATCH (u: User {userId:$userId}) RETURN u", loginObj)
    .then((result) => {
      if(result == undefined){
        res.json(msg);
        throw {
          user : "not found",
          status : 400,
        };
      }
      // console.log(result.records[0].get(0));
      if (loginObj.password === result.records[0].get(0).properties.password) {
        const token = jwt.sign(
          result.records[0].get(0).properties,
          process.env.SECRET_KEY
        );
        res.json({ user: result.records[0].get(0).properties, token: token });
      } else {
        console.log("Invalid Credetials");
        res.json(msg);
        throw {
          password: "not found",
          status: 400,
        };
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
    interestedSports: req.body.interestedSports
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





app.post("/create-team", async (req, res) => {
  var teamInfo = {
    name: req.body.name,
    players: req.body.players,
    captain: req.body.captain,
    sports: req.body.sports,
  };

  await team.createTeam(teamInfo);
});

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

  var obj = { msg: "", team: [] };

  const session = driver.session();

  if (teamName != null) {
    session
      .run("MATCH(t:Team {name: $teamName})", teamSearchObj)
      .then((result) => {
        if (result != null) {
          obj.team.push(result.records[0].get(0).properties);
          obj.msg = "Team Found";
        } else {
          obj.msg = "Team Not Found";
        }
      })
      .finally(() => {
        session.close();
      });
  } else {
    session
      .run("MATCH(t:Team{sport: $sport})", teamSearchObj)
      .then((result) => {
        var teams = result.records[0].get(0).properties;
        if (teams != null) {
          obj.team = teams;
          obj.msg = "Team Found";
        } else {
          obj.msg = "Team Not Found";
        }
      })
      .finally(() => {
        session.close();
      });
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
  res.json(obj);
});

app.post('/get-nearby-grounds', async (req,res) =>{
  let userLocation = {lat: req.body.latitude, long: req.body.longitude,}

    let nearbyGrounds = [];
    const session = driver.session();
    try{
        let result = await session.run('MATCH(t:Turf) RETURN t');

        result.records.map(record => {
            let groundLocation = record.get('Location');
            var dist = getDistanceFromLatLonInKm(groundLocation.lil, groundLocation.lon, userLocation.lat, userLocation.long);
            if(dist < 5){
                nearbyGrounds.push({
                    Name: record.get('Name'),
                    Address: record.get("Address"),
                    Contact: record.get('Contact'),
                    Ratings: record.get('Ratings'),
                    Location: {
                        Latitude: record.get("lil"),
                        Longitude: record.get("lon")
                    }
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
