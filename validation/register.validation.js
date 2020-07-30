const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function registrationValidator(data) {
   let errors = {};

   data.name = !isEmpty(data.name) ? data.name : "";
   data.email = !isEmpty(data.email) ? data.email : "";
   data.password = !isEmpty(data.password) ? data.password : "";
   data.password2 = !isEmpty(data.password2) ? data.password2 : "";

   if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = 'Name Must have a characters between 2 to 30';
   }
   if (Validator.isEmpty(data.name)) {
      errors.name = 'Name Field is Required..'
   }

   if (Validator.isEmpty(data.email)) {
      errors.email = 'Email is Required..'
   }

   if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is Invalid please...'
   }

   if (Validator.isEmpty(data.password)) {
      errors.password = 'password is Required..'
   }

   if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
      errors.password = 'password must be atleast 5 characters'
   }

   if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Confirm password Field is required..'
   }

   if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Passwords not Matching...'
   }

   return {
      errors,
      isValid: isEmpty(errors)
   }

}