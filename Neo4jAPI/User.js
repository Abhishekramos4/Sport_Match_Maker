const driver = require("./config");
const _ = require('lodash');

const createUser = async (obj) => {
  var response = {
    isCreated: "",
  };

  const session = driver.session();

  session
    .run(
      "CREATE (a:User {userId:$userId,fname:$fname,lname:$lname,email:$email,password:$password}) RETURN a",
      obj
    )
    .then((result) => {
      console.log(result.records[0].get(0));
      response.isCreated = "Success";
    })
    .catch((err) => {
      response.isCreated = "Failure";
      throw err;
    })
    .finally(() => {
      session.close();
    });

  return response;
};

function unique() {
  const session = driver.session();

  session
    .run("CREATE CONSTRAINT ON (a:User) ASSERT a.userId IS UNIQUE")
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => {
      return session.close();
    });
}

const findByUserId =  async (loginObj) => {
  
  const session = driver.session();

  session
    .run("MATCH (u: User {userId:$userId}) RETURN u",loginObj)
    .then((result) => {
      // var response = result.records[0].get('User');
      // response.push({
      //   fname: result.records[0].get(0).properties.fname,
      //   lname: result.records[0].get(0).properties.lname,
      //   password: result.records[0].get(0).properties.password,
      //   userId: result.records[0].get(0).properties.userId,
      //   email: result.records[0].get(0).properties.email,
      // });
      console.log(result.records[0].get(0));
      if(loginObj.password === result.records[0].get(0).properties.password){
        
      }
      // return (response);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      session.close();
    });

    
}


// function findByPassword(loginObj){
//     var userId = loginObj.userId;
//     var password = loginObj.password;
//     let response;
//     const session = driver.session();

//     session
//       .run("MATCH (u: User {userId:$userId,password:$password}) RETURN u")
//       .then((result) => {
//         response = result;
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         session.close();
//       });

//     return response;
// }

module.exports.createUser = createUser;
module.exports.unique = unique;
module.exports.findByUserId = findByUserId;
