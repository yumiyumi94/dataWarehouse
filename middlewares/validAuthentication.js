const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const validAuthentication = async(req, res, next)=>{
    const bearerToken = req.headers.authorization; // agarramos el token
    if(!bearerToken){
        return res.status(401).json({message: 'token is required'});
    }
    const token = bearerToken.split(' ')[1];
    if(!token){
        return res.status(400).json({message: 'Unvalid token'});
    }
    let decoded;
    try {
        decoded = jwt.verify(token, SECRET);//desarmamos el token
    } catch (error) {
        console.error(error);
        return res.status(401).json({message: 'token invalid'});
    }
    if(decoded){
        req.user = decoded;
        next();
    }else{
        console.error(error);
        return res.status(401).json({message: 'token invalid'});
    }
    //else{
        //const token = bearerToken.split(' ')[1];
    /*if(token){
        try {
        const decoded = jwt.verify(token, SECRET);//desarmamos el token
        req.user = decoded; //guardamos el user en reques
        next(); //seguimos al siguiente middleware o endpoint
        } catch (error) {
            console.error(error);
            res.status(401).json({message: 'token invalid'});
        }
        
    }else{
        res.status(401).json({message: 'token is required'});
    }*/
    //}
};

module.exports = validAuthentication; 