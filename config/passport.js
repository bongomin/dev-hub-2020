var JwtStrategy = require('passport-jwt').Strategy,
   ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Keys = require('../config/keys');
const passport = require('passport');
const keys = require('../config/keys');



var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.SECRETKEY

module.exports = passport => {
   passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
      User.findById(jwt_payload.id)
         .then(user => {
            if (user) {
               return done(null, user)
            }
            return done(null, false)
         })
         .catch(error => console.log(error))

   }))
}