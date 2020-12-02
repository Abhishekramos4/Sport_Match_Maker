const { result } = require("lodash");
var driver = require("./config");

const createTeam = function (teamObj) {
  const session = driver.session();
  session
    .run(
      "CREATE (t: Team {name: $name, players: $players, captain: $captain, sports : $sports})",
      teamObj
    )
    .then((result) => {
      console.log(result);
    })
    .finally(() => {
      session.close();
    });
};

module.exports = createTeam;
