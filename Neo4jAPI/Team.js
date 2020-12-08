const { result } = require("lodash");
var driver = require("./config");

const createTeam = async  (teamObj) => {
  const session = driver.session();
  session
    .run(
      `MERGE(t: Team {name: $name, sports : $sports,captain:$captain ,latitude: $latitude, longitude: $longitude}) MERGE(n:User {userId:$captain}) MERGE(n)-[v:IS_CAPTAIN_OF]->(t) MERGE(n)-[r:IS_PLAYER_OF]->(t) `,
      teamObj
    )
    .then((result) => {
      console.log(result);
    }).catch((err)=>{
        throw err;
    })

    .finally(() => {
      session.close();
    });
};

// const createCaptain= async  (captainData) => {
//   const session = driver.session();
//   session
//     .run(
//       "MATCH(n:User{userId:$captain}) MATCH(t:Team{name:$name}) CREATE(n)-[v:IS_CAPTAIN_OF]->(t) RETURN type(v)",
//       captainData
//     )
//     .then((result) => {
//       console.log(result);
//     }).catch((err)=>{
//         throw err;
//     })

//     .finally(() => {
//       session.close();
//     });
// };

// const createPlayers = async  (playersData) => {
//   let session ;
//   var arr=playersData.players;
//   var team =playersData.name;
//   for(var i =0;i<arr.length;i++)
//   {  
//     var id=arr[i];
//     session=driver.session();
//     session
//     .run(
//       "MATCH(n:User{userId:$id}) MATCH(t:Team{name:$name}) CREATE(n)-[r:IS_PLAYER_OF]->(t) RETURN type(r)",
//       {
//         id:id,
//         name:team
//       }
//     )
//     .then((result) => {
//       console.log(result);
//     }).catch((err)=>{
//         throw err;
//     })

//     .finally(() => {
//       session.close();
//     });



//   }
  
  
// };

// const combined= async(obj1,obj2,obj3)=>{

//    createTeam(obj1).then(()=>{createCaptain(obj2);}).then(()=>{createPlayers(obj3);});
  
// };
module.exports.createTeam = createTeam ;
// module.exports.createCaptain = createCaptain ;
// module.exports.createPlayers = createPlayers ;
