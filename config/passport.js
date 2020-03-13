const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//this lib is used to locate the token from the authorization field of header section.
const mongoose= require('mongoose');
//this is to verify if the payload info matches with user collection record.
const User= mongoose.model('users');
//or we can wite it as const User= require('../../   models/User');
const keys=require('../config/keys');

//we are using JWTstratgy's parameters to find out the location from where it an take the token to decrypt
//creating a empty obj called opts and giving inside it some keys.. by which it can decrypt
// opts={jwtFromRequest: locaion of token,secretOrKey: secret}
const opts={};
opts.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;
//we are trying to use the passport..so we are configuring it using the jwtstrategy and this strategy requires two parameters i.e the opts which consist of two keys and a call back that consist of the decryted payload which we are storing in a var caalled jwt_payload 
//we are passing the queried user objto the call back for further process.
//done is a parameter used for transferring
// false indicates that it did not find any user field matching the token.

module.exports=passport => { 
  passport.use(new JWTStrategy(opts ,(jwt_payload,done) => {
    console.log(jwt_payload);
  User.findById(jwt_payload.id)
  .then(user => {
    if(user){
      return done(null,user);
    }
    return done(null,false);
  })
  .catch(err => console.log(err));
}))}
