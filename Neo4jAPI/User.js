const neo4j = require('neo4j-driver');

const driver = neo4j.driver("bolt://localhost:11006",neo4j.auth.basic("neo4j","1234"));
function createUser(obj)
{
    var response={
        isCreated:""
    }
    const session = driver.session();

    session
    .run('CREATE (a:User {userId:$userId,fname:$fname,lname:$lname,email:$email,password:$password}) RETURN a',obj)
    .then((result)=>{
        
        console.log(result.records[0].get(0));
        response.isCreated="Success"; 
    }
        )
    .catch((err)=>{
        response.isCreated="Failure";
        throw err;})
    .finally(()=>{
         session.close();
        
    });
    
    return response;
}

function unique()
{
    const session = driver.session();

    session
    .run('CREATE CONSTRAINT ON (a:User) ASSERT a.userId IS UNIQUE')
    .then((result)=>{console.log(result);})
    .catch((err)=>{throw err;})
    .finally(()=>{
        return session.close();
    })

}

function find()
{


}


exports.createUser=createUser;
exports.unique=unique;