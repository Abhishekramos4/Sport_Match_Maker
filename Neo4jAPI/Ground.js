const fs = require("fs");
const { session } = require("neo4j-driver");
const path = require("path");
const driver = require("./config");

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

const pathName = path.join(__dirname, "turf_data.json");


const addGround = function () {
  fs.readFile(pathName, async (err, data) => {
    if (err) {
      console.log(err);
    }
    try {
			let session = driver.session();
			await session.run('MATCH (a:Turf) DETACH DELETE a');
			await session.close();
        }
        catch (error) {
			console.log(error);
        }
        
    const turfData = JSON.parse(data);
    for (let index = 0; index < turfData.length; index++) {
      const d = {
        Name: turfData[index].Name,
        Address: turfData[index].Address,
        Contact: turfData[index].Contact,
        Ratings: turfData[index].Ratings,
        Latitude:
          turfData[index].Location == null ? "" : turfData[index].Location.lil,
        Longitude:
          turfData[index].Location == null ? "" : turfData[index].Location.lon,
      };
      console.log(d);
      let session = driver.session();

      try {
        await session.run(
          "CREATE(t:Turf{name:$Name, address:$Address, contact:$Contact, ratings:$Ratings, latitude: $Latitude, longitude: $Longitude}) RETURN t",
          d
        );

        await session.close();
      }
      catch (err) {
          console.log(err);
      }
    }
  });
};



module.exports.addGround = addGround;


