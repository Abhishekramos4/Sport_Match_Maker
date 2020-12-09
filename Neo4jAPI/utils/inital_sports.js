
const driver = require("../config");

const setSports = async () => {
    let session = driver.session();
    let sportObj = {
        chess : "Chess",
        pool : "Pool",
        tennis : "Tennis",
        badminton:"Badminton"
    }
    try{
        await session.run('MATCH(s:Sport) DETACH DELETE s');
        await session.close();
    }
    catch(err){
        console.log(err);
    }

    try{
        session = driver.session();
        await session.run("CREATE(s:IndividualSport{name:$chess})",sportObj);
        await session.run("CREATE(s:IndividualSport{name:$pool})",sportObj);
        await session.run("CREATE(s:IndividualSport{name:$tennis})",sportObj);
        await session.run("CREATE(s:IndividualSport{name:$badminton})",sportObj);

        await session.close();
    }catch(err){
        console.log(err);
    }
}

module.exports.setSports = setSports;

