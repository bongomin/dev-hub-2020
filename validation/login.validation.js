const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function LoginValidator(data) {
   let errors = {};


   data.email = !isEmpty(data.email) ? data.email : "";
   data.password = !isEmpty(data.password) ? data.password : "";



   if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is Invalid please...'
   }


   if (Validator.isEmpty(data.email)) {
      errors.email = 'Email is Required..'
   }


   if (Validator.isEmpty(data.password)) {
      errors.password = 'password is Required..'
   }


   return {
      errors,
      isValid: isEmpty(errors)
   }

}