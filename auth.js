const jwt =require('jsonwebtoken');

function auth(res,req,next)
{

    const token = req.header('x-auth-token');
    console.log(token);
   
    if (!token) res.send(401).json({ msg: 'No token, authorization denied' });

    try {
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.admin = decoded;
        next();
    }
    catch (e) {
        res.status(400).json({ msg : 'Token is not valid' });
    }


}

module.exports=auth;