const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const profileModel = require('../../models/Profile.model');
const userModel = require('../../models/User.model');
const validateProfileInput = require('../../validation/profile.validation');
const validateExperienceInput = require('../../validation/experience.validation')
const validateEducationInput = require('../../validation/education.validation')


// @Route Get api/profile/test
// @desc Test profile root Route
//@Access Public
router.get('/test', (req, res) => {
   res.status(200).json({ msg: 'profile test route' })
})


// @Route Get api/profile/
// @desc Getting Current User's Profile
//@Access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
   const errors = {};
   // passport returns a user with req.user.. so linking the profile user id and the user id user
   profileModel.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
         if (!profile) {
            errors.noProfile = 'There is no Profile for this user'
            return res.status(400).json(errors)
         }
         res.status(200).json(profile)
      })
      .catch(error => res.status(404).json(error))

});


// @Route Get api/profile/all
// @desc Get all Profile 
//@Access Public
router.get('/all', (req, res) => {
   const errors = {};
   profileModel.find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
         if (!profiles) {
            errors.noProfile = 'There are no profiles';
            return res.status(400).json(errors)
         }
         res.json(profiles)
      })
      .catch(err => res.status(404).json({ profile: " There are no profiles" }));
})


// @Route Get api/profile/handle/:handle ie localhost:5000/api/profile/handle/bongomin daniel
// @desc Get Profile By handle
//@Access Public
router.get('/handle/:handle', (req, res) => {
   const errors = {};
   profileModel.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
         if (!profile) {
            errors.noProfile = 'There is no Profile for the user';
            res.status(404).json(errors)
         }
         res.json(profile)
      })
      .catch(err => res.status(404).json({ profile: " There is no profile for this user" }));
});


// @Route Get api/profile/user/:user_id ie localhost:5000/api/profile/user/5f215865f4204d747d8e4b57
// @desc Get Profile By User Id
//@Access Public
router.get('/user/:user_id', (req, res) => {
   const errors = {};
   profileModel.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
         if (!profile) {
            errors.noProfile = 'There is no Profile for the user';
            res.status(404).json(errors)
         }
         res.json(profile)
      })
      .catch(err => res.status(404).json({ profile: " There is no profile for this user" }));
});



// @Route Get api/profile/
// @desc Creating or Edit  User Profile
//@Access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
   const { errors, isValid } = validateProfileInput(req.body);
   // checking validation
   if (!isValid) {
      return res.status(400).json(errors);
   }
   // Getting fields
   const ProfileFields = {};
   ProfileFields.user = req.user.id;
   if (req.body.handle) ProfileFields.handle = req.body.handle;
   if (req.body.company) ProfileFields.Company = req.body.Company;
   if (req.body.website) ProfileFields.website = req.body.website;
   if (req.body.bio) ProfileFields.bio = req.body.bio;
   if (req.body.status) ProfileFields.status = req.body.status;
   if (req.body.gitHubUserName) ProfileFields.gitHubUserName = req.body.gitHubUserName;
   // skills must be split into un array
   if (typeof req.body.skills !== "undefined") {
      ProfileFields.skills = req.body.skills.split(',');
   }

   //Social
   ProfileFields.social = {};
   if (req.body.youtube) ProfileFields.social.youtube = req.body.youtube;
   if (req.body.twitter) ProfileFields.social.twitter = req.body.twitter;
   if (req.body.facebook) ProfileFields.social.facebook = req.body.facebook;
   if (req.body.linkedin) ProfileFields.social.linkedin = req.body.linkedin;
   if (req.body.instagram) ProfileFields.social.instagram = req.body.instagram;

   profileModel.findOne({ user: req.user.id })
      .then(profile => {
         if (profile) {
            // find and update Profile
            profileModel.findOneAndUpdate(
               { user: req.user.id },
               { $set: ProfileFields },
               { new: true }
            ).then(profile => res.json(profile));
         } else {
            // create new profile
            // check if handle exists
            profileModel.findOne({ handle: ProfileFields.handle })
               .then(profile => {
                  if (profile) {
                     errors.handle = 'That Handle already exists'
                     res.status(400).json(errors)

                  }
                  // create or save profile
                  new profileModel(ProfileFields).save()
                     .then(profile => res.json(profile))
               })
         }
      })

});

// @Route Post api/profile/experience
// @desc  add an expirience to profile
//@Access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {

   const { errors, isValid } = validateExperienceInput(req.body);
   // checking validation 
   if (!isValid) {
      return res.status(400).json(errors);
   }

   profileModel.findOne({ user: req.user.id })
      .then(profile => {
         const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
         }
         // How to add to experience array in db
         profile.experience.unshift(newExp)
         profile.save()
            .then(profile => res.json(profile))
      })
})


// @Route Post api/profile/education
// @desc  add an education to profile
//@Access Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {

   const { errors, isValid } = validateEducationInput(req.body);
   // checking validation 
   if (!isValid) {
      return res.status(400).json(errors);
   }

   profileModel.findOne({ user: req.user.id })
      .then(profile => {
         const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldOfStudy: req.body.fieldOfStudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
         }
         // How to add to experience array in db
         profile.education.unshift(newEdu)
         profile.save()
            .then(profile => res.json(profile))
      })
});



// @Route delete api/profile/experience/:exp_id
// @desc  deleting experience from user  profile
//@Access Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
   profileModel.findOne({ user: req.user.id })
      .then(profile => {
         // Get remove index
         const removeIndex = profile.experience
            .map(item => item.id).indexOf(req.params.exp_id);
         //splice out array
         profile.experience.splice(removeIndex, 1);
         // save
         profile.save()
            .then(profile => res.json(profile))
            .catch(err => res.status(404).json(err))

      })

});


// @Route delete api/profile/education/:edu_id
// @desc  deleting education from user  profile
//@Access Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
   profileModel.findOne({ user: req.user.id })
      .then(profile => {
         // Get remove index
         const removeIndex = profile.education
            .map(item => item.id).indexOf(req.params.edu_id);
         //splice out array
         profile.education.splice(removeIndex, 1);
         // save
         profile.save()
            .then(profile => res.json(profile))
            .catch(err => res.status(404).json(err))

      })

});

// @Route delete api/profile
// @desc  deleting User and Profile
//@Access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
   profileModel.findOneAndRemove({ user: req.user.id })
      .then(() => {
         userModel.findOneAndRemove({ _id: req.user.id })
            .then(() => res.json({ success: true }));
      })

});

module.exports = router;