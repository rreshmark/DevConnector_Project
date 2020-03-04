const express= require('express');
const router= express.Router();

// @route   POST api/posts/tests
// @desc    tests post route
// @access  Public

router.get('/test',(req,res)=>res.json({msg:'Posts works'}));

module.exports=router;
//only when we export the router ..when he hit the url..the server.js knows which page to redirect the url to..