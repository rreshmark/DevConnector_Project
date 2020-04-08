const express= require('express');
const User= require('../../models/User');
const gravatar= require('gravatar');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
//this is the passport lib
const router= express.Router();
const validateRegisterInput= require('../../validation/register');
const validateLoginInput= require('../../validation/login');
// we are creating a instance of express called as router and calling the Router feature of express only to use in this user.js file..rather than creating a whole express instance like we did in the server.js file.

//the below lines were used for testing the routes.
// @route   GET api/users/register
// @desc    Register user
// @access  Public
//router.get('/register',(req,res)=>res.json({msg:'User works'}));
// here test is the sub route..only if we enter/uer/api/register..the "user works" will get displayed

// @route   POST api/users/register
// @desc    Register user
// @access  Public

router.post('/register',(req,res) => {

  const {errors,isValid}=validateRegisterInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  //we are storing the obj getting back from validate func in to a object in which the parameters are errors and isvalid..so the return obj will get mapped respectively refer video date -(mar 3)
  // console.log("register checking for " + req.body.email);
  // console.log("register User is "+ JSON.stringify(User));

User.findOne({email:req.body.email})

//here User is the representaion of users collection..so we are checking if the entered email is already present or not
//from the above stmt..we are storing the result either (user found or null value ) in to a variable user and validating based on the results.

.then(user => {
  if(user){
    //wherever we are writing the elaborate fun in callback we have to use return
            return res.status(400).json({email:"Email Already exits!"})
         }
         else{
               const avatar= gravatar.url(req.body.email,{
                 s: '200',
                 r: 'pg',
                 d:'mm'
               });
               const newUser = new User({
                 name:req.body.name,
                 email:req.body.email,
                 password:req.body.password,
                 avatar
                 //above we are writing schem name avatar and giving the var name avatar to the right side of it like avatar:avatar
                 //in js if both the side are same..it deconstructs it../
                 //hence we can write it as avatar
               });
               //salt refers to key here for hashing 
               bcrypt.genSalt(10,(err,salt) =>{
               if(err) throw err;//if any error comes up..it shows in console else it executes the next line
               //after hashing is done.again using callback to check if the hashing is done or not done.. it throws error else the hashed password..here the hash irefers to the hashed password
               bcrypt.hash(newUser.password,salt,(err,hash) => {
                 newUser.password=hash;//we are overriding the password field with the newly hashed password
                 newUser.save()
                 .then(user => res.json(user))//we are saying it to display the user object back in postman console
                 .catch(err => console.log(err))


               })
              });
               
         }
})

.catch(err => console.log(err))
});

// @route   POST api/users/login
// @desc    Login user
// @access  Public
//we are writing login functionality
//we are checking if the user recoe=rd is already present in our db using User.findone
//then we are storing the fetched info in user variable and processing it
router.post('/login',(req,res) =>
{
  const {errors,isValid}=validateLoginInput(req.body)
  if(!isValid){
    return res.status(400).json(errors);
  }

  //  console.log("checking for " + req.body.email);
  //  console.log("User is "+ JSON.stringify(User));

  User.findOne({email:req.body.email})
  .then(user => {
    //if the user is not found
    if(!user){
      return res.status(404).json({email:'User not Found!'});
    }
    else{
      //we are saying bcrypt to compare the incoming plain text pwd and the hashed pwd present in db table
      bcrypt.compare(req.body.password,user.password)
      //the bcryot will give boolean result..storing that in isMatch
      .then(isMatch => {
        if(isMatch){
          //User Matched
          //payload
          const payload =  {
            id:user.id,
            name:user.name,
            avatar:user.avatar
          };

          //signtoken or generatingtoken..here we are using jwt to create token using the payload pieces we mentioned above and to it attaching the key we specified in keys.js file.
          // we have set a timelimit for the token..so using the optional parameter in jwt and setting a time limit of 1 hr
           //here the "token" is the generated token from jwt
           console.log("payload for signing "+ JSON.stringify(payload));
          jwt.sign(payload,keys.secretOrkey,
           {expiresIn:3600},
           (err,token) =>
           {
             res.json({
               success: true,
               token: 'Bearer ' + token 
               //Bearer is type of token in JWT..which we use primrilily for web app
             }
             )
           } )

          //return res.json({msg:'Success!'})
        }
        else{
          //400 is bad request
          return res.status(400).json({password:'Password is incorrect!'});
        }
      })
      //if we don't use catch..when we enter only email field and leave the pwd field empt..the postman hangs..that's y we use catch to print the error in console
      //.catch(err => console.log(err));
    }
  })
  .catch(err => console.log(err));
}
)

// @route   GET api/users/current
// @desc    get current user information
// @access  Private
//in order to use this current api we are passing the passport layer in between which verifies the user tken and then goes to the call back state.
router.get(
  '/current' ,
  //we do not want our session to be carry forward in to any other site.
  //we can set it to true too..later if we want
  // the done parameter is used to transfer the user obj to the callback here
  //for every private route..we need to use this passport.authnticate layer in between.
  passport.authenticate('jwt' , {session:false}) ,
  (req,res)=> {
     res.json({
       id:req.user.id,
       name:req.user.name,
       email:req.user.email

     });
  }
);

module.exports=router;
