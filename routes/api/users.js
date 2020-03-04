const express= require('express');
const User= require('../../models/User');
const router= express.Router();
// we are creating a instance of express called as router and calling the Router feture of express only to use in this user.js file..rather than creating a whole express instance like we did in the server.js file.

// @route   GET api/users/register
// @desc    Register user
// @access  Public
//router.get('/register',(req,res)=>res.json({msg:'User works'}));
// here test is the sub route..only if we enter/uer/api/register..the "user works" will get displayed

// @route   GET api/users/register
// @desc    Register user
// @access  Public

router.post('/register',(req,res) => {
User.findOne({email:req.body.email})
})

module.exports=router;
