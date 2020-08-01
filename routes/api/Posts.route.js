const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { authenticate } = require('passport');

const postModel = require('../../models/Posts.model');
const postsValidator = require('../../validation/posts.validation');
const ProfileModel = require('../../models/Profile.model');


// @Route Get api/posts/
// @desc posts root Route
//@Access Public
router.get('/posts', (req, res) => {
   res.status(200).json({ msg: 'posts roots' })
})


// @Route Get api/posts/
// @desc Display and show all posts
//@Access Public
router.get('/', (req, res) => {
   postModel.find()
      .sort({ date: -1 })
      .then(posts => {
         res.json(posts)
      })
      .catch(err => res.status(404).json({ noPost: "No posts Found" }));

});

// @Route Get api/posts/:id
// @desc show id by id
//@Access Public
router.get('/:id', (req, res) => {
   postModel.findById(req.params.id)
      .then(post => {
         res.json(post)
      })
      .catch(err => res.status(404).json({ noPost: "No post with that Id" }));

});


// @Route Post api/posts/
// @desc Creating a post
//@Access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

   const { errors, isValid } = postsValidator(req.body);
   // checking validation
   if (!isValid) {
      return res.status(400).json(errors);
   }
   const newPost = new postModel({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
   })
   newPost.save().then(post => {
      res.status(200).json(post)
   })
      .catch(err => console.log(err))
});

// @Route Post api/posts/
// @desc Delete a post
//@Access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
   const { errors, isValid } = postsValidator(req.body);
   // checking validation
   if (!isValid) {
      return res.status(400).json(errors);
   }

   ProfileModel.findOne({ user: req.user.id })
      .then(profile => {
         postModel.findById(req.params.id)
            .then(post => {
               //check the post user (owner)
               if (post.user.toString() !== req.user.id) {
                  return res.status(401).json({ notAuthorized: "User not authorized" })
               }
               post.remove()
                  .then(() => {
                     res.json({ success: true })
                  })
                  .catch(err => console.log(err))
            })
      })
});


// @Route Post api/posts/like/:id
// @desc Like a post
//@Access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
   const { errors, isValid } = postsValidator(req.body);
   // checking validation
   if (!isValid) {
      return res.status(400).json(errors);
   }

   ProfileModel.findOne({ user: req.user.id })
      .then(profile => {
         postModel.findById(req.params.id)
            .then(post => {
               if (post.likes.filter(like => like.user.toString() === req.user.id)
                  .length > 0
               ) {
                  return res.status(400).json({ alreadyLiked: " you already like this post" })
               }
               // Add the user Id to the likes Array
               post.likes.unshift({ user: req.user.id })

               post.save().then(post => res.json(post));
            })
            .catch(err => console.log(err))
      })
})


// @Route Post api/posts/unlike/:id
// @desc unLike a post
//@Access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
   const { errors, isValid } = postsValidator(req.body);
   // checking validation
   if (!isValid) {
      return res.status(400).json(errors);
   }

   ProfileModel.findOne({ user: req.user.id })
      .then(profile => {
         postModel.findById(req.params.id)
            .then(post => {
               if (post.likes.filter(like => like.user.toString() === req.user.id)
                  .length === 0
               ) {
                  return res.status(400).json({ notliked: `${req.user.name} you have not yet liked this post` })
               }
               //  Get the remove index before removing the like
               const removeIndex = post.likes
                  .map(item => item.user.toString())
                  .indexOf(req.user.id);

               // splice out of the ray
               post.likes.splice(removeIndex, 1);
               //save
               post.save()
                  .then(post => res.json(post))
            })
            .catch(err => console.log(err))
      })
});


// @Route Post api/posts/comment/:id
// @desc Adding a Comment to a Post
//@Access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
   const { errors, isValid } = postsValidator(req.body);
   // checking validation
   if (!isValid) {
      return res.status(400).json(errors);
   }
   postModel.findById(req.params.id)
      .then(post => {
         const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
         }
         // Adding comments to the comments array
         post.comments.unshift(newComment);
         // saving the comment
         post.save()
            .then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postnotfound: "No Post Found with Id..." }))

})

// @Route Delete api/posts/comment/:id/:comment_id   ie localhost:5000/api/posts/comment/(post_id)/(comment_id)
// @desc deleting a Comment to a Post
//@Access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
   postModel.findById(req.params.id)
      .then(post => {
         // checking comment existance
         if (post.comments.filter(Comment => Comment._id.toString() === req.params.comment_id).length === 0) {
            return res.status(4040).json({ noComment: "The comment you are trying to delete,does not exist" });
         }
         //get remove index
         const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);
         // splice comment out of Array.
         post.comments.splice(removeIndex, 1)
         post.save()
            .then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ postnotfound: "No Post Found with Id..." }))

})

module.exports = router;