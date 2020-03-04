const express= require('express');
const router= express.Router();

// @route   POST api/profile/test
// @desc    tests post route
// @access  Public

router.get('/test',(req,res)=> res.json({msg:'Profile works'}));

module.exports = router;

