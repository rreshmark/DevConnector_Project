const express= require('express');
const router= express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post model
const Post = require('../../models/Post');

//Profile model
const Profile = require('../../models/Profile');

//validation

const validatePostInput = require('../../validation/post');

// @route   GET api/posts
// @desc    Get posts
// @access  Public

router.get('/',(req,res) =>
{
  //find will fetch 0 or more records
  //sorting the posts with help of the dates field in posts model in descending order i.e (-1)..so that latest post in on top view
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
//when clicking on a specific post.how to get that post refer (3/15 | 24:30)

router.get('/:id',(req,res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err =>
    res.status(404).json({nopostfound:'No post found with this ID'})
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private

router.post('/',
passport.authenticate("jwt",{session:false})
, (req,res) =>{
const {errors,isValid} = validatePostInput(req.body);

// check validation
if(!isValid){
  return res.status(400).json(errors);
}

//if everything is fine..create a new post

const newPost = new Post({

  text: req.body.text,
  name:req.body.name,
  avatar:req.body.avatar,
  user:req.user.id
});
newPost.save()
.then(post => res.json(post));

}
);


// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private

router.delete('/:id',
passport.authenticate("jwt",{session:false}),
(req,res) => {
  Profile.findOne({user:req.user.id})
  .then(profile =>
    {
      Post.findById(req.params.id)
      .then(post => {
        //check the owner of the post with the user from passport authentication
        if(post.user.toString() !== req.user.id) {
          return res.status(401).json({notauthorized:'User not authorized'});
        }
        //Delete post
        post.remove()
        .then(() =>res.json({success:true}));
        
      })
      .catch(err => res.status(404).json({postnotfound:'No post found'}));
    });
}
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

router.post('/like/:id',
passport.authenticate("jwt",{session:false})
, (req,res) => {
  Profile.findOne({user:req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
    .then(post =>
      {
        // we are checking using a filter method in the likes array present inside the post model that if the liked user record is already present or not..  
        if(
           post.likes.filter(like => like.user.toString() === req.user.id)
           .length > 0
        ){
           return res.status(400)
           .json({alreadyliked:'user already liked this post'});
        }
//add user id to likes array
     
        post.likes.unshift({user:req.user.id});
        post.save()
        .then(post => res.json(post));

      })
      .catch(err => res.status(404).json({postnotfound: 'No post found'}));

  });
}
);
 
router.post('/unlike/:id',
passport.authenticate("jwt",{session:false})
,(req,res) => {
  Profile.findOne({user:req.user.id})
  .then (profile => {
    Post.findById(req.params.id) 
    .then(post => {
      //checking if the user has liked the post or not earlier..if he hasnt like the post..he will not be able to unlike it unless he likes it earlier.
         if(
             post.likes.filter(like => like.user.toString() === req.user.id)
             .length === 0
         ){
             return res.status(400).json({notlike:'you have not liked this post earlier'});
         }
         // if he has liked it before and now unliking the post.. we have to remove him from the liked array
         const removeIndex = 
         post.likes.map(item => item.user.toString())
         .indexOf(req.user.id);
         //splice it out

         post.likes.splice(removeIndex,1);

         //save 
         post.save()
         .then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
      });
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private

router.post('/comment/:id',
passport.authenticate("jwt",{session:false})
, (req,res) =>
{
  const{errors,isValid} = validatePostInput(req.body);

  //check validation if the comment is properly typed and not contain only spaces
if(!isValid){
  return res.status(400).json(errors);
}
//we need to find the post in order to add the comment in the post
Post.findById(req.params.id)
.then (post => {
  const newComment = {
    text : req.body.text,
    name:req.body.name,
    avatar:req.body.avatar,
    user:req.user.id
  };
//Adding comments array..using unshift to keep the lastest comment on top
post.comments.unshift(newComment);

//save
post.save()
.then(post => res.json(post));

})
.catch(err => res.status(404).json({postnotfound:'No post found to add comment'}));

}
);
// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
//:id is the post id and :comment_id is the unique id assignmed to the comment by mongodb
 
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        //the reason we are using tostring() in many places because the parameters which is used gets converted to string automaically..so to compare the two .. we are converting the id in the comments field from db to string
    // filter acts like a "where"vfor  each comment check if the id are matching
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
         //if comment is found then delete it
//the same reason as above for using the tostring() here..
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);


module.exports=router;
//only when we export the router ..when he hit the url..the server.js knows which page to redirect the url to..