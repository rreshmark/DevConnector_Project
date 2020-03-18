const express= require('express');
const router= express.Router();
const mongoose= require("mongoose");
const passport=require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");
// Load Validation
const validateProfileInput = require("../../validation/profile");

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private

router.get("/", passport.authenticate("jwt",{session:false}),
(req,res) => {
  const errors ={};
  Profile.findOne({user:req.user.id})
  .populate("user",["name","avatar"])
  .then(profile => {
    if(!profile){
       errors.noprofile="There is no profile for the user";
       return res.status(400).json(errors);
   }
   res.json(profile);
})
.catch(err => res.status(404).json(err));
}
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all",(req,res) => {
     const errors={};

     Profile.find()
     .populate("user",["name","avatar"])
     .then (profiles => {
       if(!profiles){
         errors.noprofile="there are no profiles"
         return res.status(400).json(errors);
       }
       res.json(profiles);
       
     })
     .catch(err => res.status(404).json({profile:"There are no profiles"}));
});
// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
// we are trying to get the profile by parameter entered in tha api..that parameter we are accessing by a var called handle here i.e :handle
// : denotes that it is a parameter

router.get("/handle/:handle",(req,res) =>{
  const errors={};

  Profile.findOne({handle:req.params.handle})
  .populate("user",["name","avatar"])
  .then(profile =>{
    if(!profile){
      errors.noprofile="There is neither profile nor handle for this user";
      return res.status(400).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id",(req,res)=>{
  const errors={};

  Profile.findOne({user:req.params.user_id})
  .populate("user",["name","avatar"])
  .then(profile => {
    if(!profile){
      errors.noprofile="There is no profile with this user_id";
      return res.status(400).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(400).json({err})
  );

});



// @route   POST api/profile
// @desc    create or edit user profile
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt",{session:false}),
  (req,res) => {
    const{errors,isValid} = validateProfileInput(req.body);
    if(!isValid){
      return res.status(400).json(errors);
    }

//after the checking..if the user is valid then we are getting the fields that he has entered in the profile.
//the reason we are creating a empty obj because..some fields are not mandatory..so we are checking if they have written any info in fields..and if present we are mapping it to the obj profileFields

const profileFields = {};
profileFields.user= req.user.id;
if(req.body.handle) profileFields.handle= req.body.handle;
if(req.body.company) profileFields.company=req.body.company;
if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location= req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

      //to get the skills which is an array we are splitting it  by ','and storing it.
      // we can write the below line as if (req.body.skills) also.
      if(typeof req.body.skills !== "undefined") {
          profileFields.skills=req.body.skills.split(",");
      }
      //we are filling up our social section..where there are several objects inside social object

      profileFields.social={};
      if(req.body.youtube) profileFields.social.youtube=req.body.youtube;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
//we are checking if it'sa new user or old user by verifiying his id 
//findone will give back a profile..if profle exist..we are finding the user document by his id and then setting the newly edited data i.e profilefields and allowing the newly entered data to get updated in the document by setting new:true.
    Profile.findOne({user:req.user.id})
    .then(profile =>{
           if(profile){
             //update
             Profile.findOneAndUpdate(
               {user:req.user.id},
               {$set: profileFields},
               {new:true} ) 
               .then(profile =>res.json(profile) );   
           }
           // when the user is new..we are checking if the user is using a new handle.
           else{
                 Profile.findOne({handle:profileFields.handle})
                 .then(profile => {
                   if(profile){
                     errors.handle="Handle name already exists!";
                     return res.status(400).json(errors);

                   }
                   //save the profile of new user by storing the profilefields obj..
                   new Profile(profileFields)
                   .save()
                   .then(profile => res.json(profile) );
                 });
           }
    });


  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
//this delete is mostly used in backend an dnot by end user..
// we are deleting the profile data by finding out the id and then there is no point in keeping the user data in user collection without his profile info..so deleting the data from user collection too. by finding his id.
router.delete("/",
passport.authenticate("jwt",{session:false}),
(req,res) => {
  Profile.findOneAndRemove({user:req.user.id})
  .then(()=>{
    User.findOneAndRemove({_id:req.user.id})
    .then(() => 
    res.json({success:true})
    );
  });
  
}
);


module.exports = router;
