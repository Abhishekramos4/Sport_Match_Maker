const jwt =require('jsonwebtoken');

function auth(req,res,next)
{

    
    const bearer =  req.headers.authorization;
   
    console.log(req.headers.authorization);
    const splitBearer= bearer.split(' ');

    const token = splitBearer[1];


    console.log(token)
    if (token == null) res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.user = decoded;
        console.log(req.user);
        next();
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ msg : 'Token is not valid' });
    }


}

module.exports=auth;