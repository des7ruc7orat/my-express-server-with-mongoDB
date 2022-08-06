const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const blacklist = new Set();

const { SECRET, SALTED_ROUNDS } = require('../config/env');

//exports.register = ({username,email,password}) => User.create({username,email,password})


exports.register = async ({ email, username, password }) => {

    const existing = await User.findOne({ email });
    if (existing) {
        throw new Error('Email is taken');

    }
    const hashedPassword = await bcrypt.hash(password, SALTED_ROUNDS);

    const user = new User({
        username,
        email,
        password: hashedPassword
    })

    await user.save();

    // const user = User.create({
    //     username,
    //     email,
    //     password:hashedPassword
    // })

    return createSession(user);
};

exports.logout = (token)=>{
    blacklist.add(token);
}

exports.login = async ({ email, password }) => {
    //  const {email, password} = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email or password does not match!');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Email or password does not match!');
    }

  
  //  console.log(await createSession(user));
  
    return createSession(user);
};

async function createSession(user) {

    // const payload = {
    //     email:user.email,
    //     username:user.email,
    //     _id:user._id,
    // }

    // const accesToken = jwt.sign(payload, SECRET)

    const payload = { _id: user._id, username: user.username, email: user.email,role: user.role };
    const options = { expiresIn: '2d' };
    const tokenPromise = await new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, decodedToken) => {
            if (err) {
                return reject(err);
            }
            resolve(decodedToken);

        });
    });
    // const token = jwt.sign(payload, SECRET,options)

    return {
        accessToken: tokenPromise,
        email: user.email,
        username: user.username,
        _id: user._id,
        role:user.role
    }
}

exports.validateToken = (token) => {
    // ako ima ne6to i mi gurmi, za6toto na register i login mai wru6ta
    // razlichen token
if(blacklist.has(token)){
    throw new Error('Token is blacklisted')
}

    return  jwt.verify(token, SECRET,((err,decodedToken)=>{
        if(err){
            // res.clearCookie(COOKIE_SESSION_NAME);
            // res.render('404',{message:'Unverified token, it will be deleted!!!'})
        }
        // req.user = decodedToken;
        // res.locals.user = decodedToken;

       
    }));

    }