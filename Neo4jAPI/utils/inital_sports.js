
const driver = require("../config");

const setSports = async () => {
    let session = driver.session();
    let sportObj = {
        chess : "chess",
        carrom : "carrom",
        tennis : "tennis",
    }
    try{
        await session.run('MATCH(s:Sport) DETACH DELETE s');
        await session.close();
    }
    catch(err){
        console.log(err);
    }

    try{
        await session.run('CREATE(s:Sport{name:$chess})',sportObj);
        await session.run('CREATE(s:Sport{name:$carrom})',sportObj);
        await session.run("CREATE(s:Sport{name:$tennis})",sportObj);
    }catch(err){
        console.log(err);
    }
}

module.exports.setSports = setSports;

