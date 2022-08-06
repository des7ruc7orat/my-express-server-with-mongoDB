const { validateToken } = require("../services/userService");
const { SECRET } = require('../config/env')
const jwt = require('jsonwebtoken');

exports.auth = function (req, res, next) {



    // sa malko bukwi da e x i a to gore na token

    //  try {
    const token = req.headers['x-authorization'];

    if (token) {
        let decodedToken = jwt.verify(token, SECRET);
        if (decodedToken) {
            req.user = {
                email:decodedToken.email,
                _id:decodedToken._id,
                username: decodedToken.username
            }
           
            next();
        } else {
            res.status(401).json('You are not authorized');
        }
    }
    // const payload = validateToken(token)
    // req.user = {
    //     email : payload.email,
    //     _id: payload._id,
    //     username: payload.username,
    //     accessToken: payload.accessToken

    // }


    // } catch (err) {
    //     return res.status(401).json({message:'Invalid acces token, please login'})
    // }

};


exports.isAuth = function (req,res,next){
    if(req.user){
      
        next()
    } else{
        res.status(401).json({message:'You are not authorized'});
    }
}


exports.verifyToken= function(req,res,next){

    const bearerHeader = req.headers['x-authorization'];

    if(typeof bearerHeader !=='undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        next()
    }else{
        res.json({message:'Forbiden token'})
    }
}