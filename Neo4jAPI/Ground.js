const fs = require("fs");
const { session } = require("neo4j-driver");
const path = require("path");
const driver = require("./config");



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
      // console.log(d);
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


