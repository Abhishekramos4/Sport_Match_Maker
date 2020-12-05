const fs = require("fs");
const path = require("path");
const driver = require("./config");

const pathName = path.join(__dirname, "turf_data.json");

const addGround = async () => {
  fs.readFile(pathName, (err, data) => {
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
      const d = turfData[index];
      let session = driver.session();

      try {
        await session.run(
          "CREATE(t:Turf{name:$Name, address:$Address, contact:$Contact, ratings:$Ratings, location: $Location})",
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

module.exports = addGround;


