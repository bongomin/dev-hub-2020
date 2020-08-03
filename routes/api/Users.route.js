const express = require('express');
const router = express.Router();
var gravatar = require('gravatar');
const User = require('../../models/User.model');
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Keys = require('../../config/keys');
const keys = require('../../config/keys');
const passport = require('passport')

// Loading Input Validation
const validateRegisterInput = require('../../validation/register.validation');
const validateLoginInput = require('../../validation/login.validation')


// @Route Get api/users/
// @Test Users root Route
//@Access Public
router.get('/', (req, res) => {
   res.status(200).json({ msg: 'users root' })
})


// @Route Post api/users/register
// @desc Regsiter  Users
//@Access Public
router.post('/register', (req, res) => {

   const { errors, isValid } = validateRegisterInput(req.body);
   // checking validation
   if (!isValid) {
      return res.status(400).json(errors);
   }

   User.findOne({ email: req.body.email })
      .then(user => {
         if (user) {
            console.log(req.body.name, req.body.email, req.body.password)
            errors.email = 'Email already Exists buddy..!';
            return res.status(400).json(errors)
         } else {
            // generating default avatar
            const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });

            const newUser = new User({
               name: req.body.name,
               email: req.body.email,
               password: req.body.password,
               avatar: avatar
            })
            console.log(newUser)
            // using bycrpt to encript the password before saving
            bycrypt.genSalt(10, (err, salt) => {
               bycrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save()
                     .then(user => res.json(user))
                     .catch(error => console.log(error))
               })
            })


         }
      })


})

// @Route Post api/users/login
// @desc login to the app /Returning the jwt webToken
//@Access Public
router.post('/login', (req, res) => {

   const { errors, isValid } = validateLoginInput(req.body);
   // checking validation
   if (!isValid) {
      return res.status(400).json(errors);
   }

   const email = req.body.email;
   const password = req.body.password;

   // finding user by email
   User.findOne({ email })
      .then(user => {
         // checking user
         if (!user) {
            errors.email = "User Not Found"
            return res.status(404).json(errors)
         }
         // checking the password and compare incrypted password
         bycrypt.compare(password, user.password)
            .then(isMatch => {
               if (isMatch) {
                  // if password match and email create a token
                  // user Matched
                  // creating jwt payload
                  const payLoad = { id: user.id, name: user.name, avatar: user.avatar }
                  //Assign Token
                  jwt.sign(payLoad, keys.SECRETKEY, { expiresIn: 3600 }, (err, token) => {
                     res.json({
                        "success": true,
                        token: 'Bearer' + ' ' + token
                     })
                  })

               } else {
                  errors.password = "password Incorrect"
                  return res.status(400).json(errors)
               }
            })
      })

}
)


// @Route Get api/current/
// @desc return who ever the token belongs to
//@Access Private
router.get('/current', passport.authenticate('jwt', { session: false }),
   function (req, res) {
      res.json({
         id: req.user.id,
         name: req.user.name,
         email: req.user.email,
         date: req.user.date,
         avatar: req.user.avatar
      })
   }
);


module.exports = router;